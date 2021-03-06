import { observable, action, computed, configure, runInAction } from "mobx";
import { createContext, SyntheticEvent } from "react";
import { IActivity } from "../models/activity";
import agent from "../api/agent";

configure({ enforceActions: "always" });

class ActivityStore {
  @observable activityRegistry = new Map();
  @observable activities: IActivity[] = [];
  @observable loadingInitial = false;
  @observable activity: IActivity | null = null;
  @observable editMode = false;
  @observable submitting = false;
  @observable target = "";

  @computed get activitiesByDate() {
    return this.groupActivitiesByDate(Array.from(this.activityRegistry.values()))
  }

  groupActivitiesByDate(activities : IActivity[]){
    const sortedActivities = activities.sort(
       (a, b) => a.date!.getTime() - b.date!.getTime()
    )
    return Object.entries(sortedActivities.reduce((activities, activity) => {
      const date = activity.date.toISOString().split('T')[0];
      activities[date] = activities[date] ? [...activities[date], activity] : [activity];
      return activities ;
    }, {} as {[key : string] : IActivity[]}));
  }

  @action loadActivities = async () => {
    this.loadingInitial = true;
    try {
      const activities = await agent.Activities.list();
      runInAction('loading activities',() => {
        activities.forEach(activity => {
          activity.date = new Date(activity.date)
          this.activityRegistry.set(activity.id, activity);
        });
        this.loadingInitial = false;
      });
      console.log(this.groupActivitiesByDate(activities))
    } catch (error) {
      runInAction('load activity error',() => {
        this.loadingInitial = false;
      });
      console.log(error);
    }
  };

  @action loadActivity = async (id : string) => {
    let activity =  this.getActivity(id);
    if (activity) {
      this.activity = activity;
    }else{
      this.loadingInitial = true ;
      try {
        activity = await agent.Activities.details(id);
        runInAction('getting activity', () => {
          activity.date = new Date(activity.date)

          this.selectActivity = activity;
          this.loadingInitial = false;
        })
      } catch (error) {
        runInAction('get activity error', () => {
          this.loadingInitial = false;
        })
        console.log(error)
      }
    }
  }

  @action clearActivity = () => {
    this.activity = null;
  }

  getActivity = (id : string) => {
    return this.activityRegistry.get(id);
  }



  @action selectActivity = (id: string) => {
    this.activity = this.activityRegistry.get(id);
    this.editMode = false;
  };

  @action createActivity = async (activity: IActivity) => {
    this.submitting = true;
    try {
      await agent.Activities.create(activity);
      runInAction('creating activity',() => {
        this.activityRegistry.set(activity.id, activity);
        this.editMode = false;
        this.submitting = false;
      });
    } catch (error) {
      runInAction('create activity error',() => {
        this.submitting = false;
      });
      console.log(error);
    }
  };

  @action deleteActivity = async (
    event: SyntheticEvent<HTMLButtonElement>,
    id: string
  ) => {
    this.submitting = true;
    this.target = event.currentTarget.name;
    try {
      await agent.Activities.delete(id);
      runInAction('deleting activity',() => {
        this.activityRegistry.delete(id);
        this.submitting = false;
        this.target = "";
      });
    } catch (error) {
      runInAction('delete activity error',() => {
        this.submitting = false;
        this.target = "";
      });
      console.log(error);
    }
  };

  @action editActivity = async (activity: IActivity) => {
    this.submitting = true;
    try {
      await agent.Activities.update(activity);
      runInAction('editing activity',() => {
        this.activityRegistry.set(activity.id, activity);
        this.activity = activity;
        this.editMode = false;
        this.submitting = false;
      });
    } catch (error) {
      runInAction('edit activity error',() => {
        this.submitting = false;
      });
      console.log(error);
    }
  };

  @action openEditForm = (id: string) => {
    this.activity = this.activityRegistry.get(id);
    this.editMode = true;
  };

  @action cancelSelectedActivity = () => {
    this.activity = null;
  };

  @action cancelFormOpen = () => {
    this.editMode = false;
  };

  @action openCreateForm = () => {
    this.editMode = true;
    this.activity = null;
  };
}

export default createContext(new ActivityStore());
