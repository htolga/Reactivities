import React, { useContext } from 'react'
import { Item, Button, Label, Segment, Icon } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import ActivityStore from '../../../app/stores/activityStore'
import { IActivity } from '../../../app/models/activity'
import {format} from 'date-fns'

const ActivityListItem: React.FC<{ activity: IActivity }> = ({ activity }) => {
    const activityStore = useContext(ActivityStore);
    const { submitting, target, deleteActivity } = activityStore;
    return (
        <Segment.Group>
            <Segment>
                <Item.Group>
                <Item>
                    <Item.Image size='tiny' circular src='assets/user.png' />
                    <Item.Content>
                        <Item.Header as='a'>{activity.title}</Item.Header>
                        <Item.Description>
                            Hosted by Tolga
                </Item.Description>                        
                    </Item.Content>
                </Item>
                </Item.Group>   
            </Segment>
            <Segment>
                <Icon name='clock' />{format(activity.date, 'h:mm a')}
                <Icon name='marker' />{activity.venue}, {activity.city}
            </Segment>
            <Segment secondary>
                Attendees will go here
        </Segment>
            <Segment clearing>
                <span>{activity.description}</span>
                <Button as={Link} to={`activities/${activity.id}`} floated='right' content='View' color='blue' />
                <Button onClick={(e) => deleteActivity(e, activity.id)} name={activity.id} floated='right' loading={target === activity.id && submitting} content='Delete' color='red' />
            </Segment>
        </Segment.Group>
    )
}


export default ActivityListItem