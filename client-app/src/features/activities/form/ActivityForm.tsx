import React, { useState, FormEvent, useContext, useEffect } from 'react'
import { Segment, Form, Button, Header, Grid } from 'semantic-ui-react'
import {IActivityFormValues } from '../../../app/models/activity'
import { v4 as uuid } from 'uuid'
import ActivityStore from '../../../app/stores/activityStore'
import { observer } from 'mobx-react-lite'
import { RouteComponentProps } from 'react-router-dom'
import { Form as FinalForm, Field } from 'react-final-form';
import { values } from 'mobx'
import TextInput from '../../../app/common/form/TextInput'
import TextAreaInput from '../../../app/common/form/TextAreaInput'
import SelectInput from '../../../app/common/form/SelectInput'
import { category } from '../../../app/common/options/categoryOptions'
import DateInput from '../../../app/common/form/DateInput'
import { combineDateAndTime } from '../../../app/common/util/util'

interface DetailsParams {
    id: string
}



const ActivityForm: React.FC<RouteComponentProps<DetailsParams>> = ({ match, history }) => {
    let baslik = ''
    const activityStore = useContext(ActivityStore);
    const { createActivity, editActivity, submitting, activity: initialFormState, loadActivity, clearActivity } = activityStore;

    const [activity, setActivity] = useState<IActivityFormValues>({
        id: undefined,
        title: '',
        category: '',
        description: '',
        date: undefined,
        time: undefined,
        city: '',
        venue: ''
    });

    useEffect(() => {
        if (match.params.id && activity.id) {
            loadActivity(match.params.id).then(() => initialFormState && setActivity(initialFormState))
        }

        return () => {
            clearActivity();
        }
    }, [loadActivity, clearActivity, match.params.id, initialFormState, activity.id])

    const handleSubmit = () => {
        if (activity.id) {
            let newActivity = {
                ...activity,
                id: uuid()
            }
         //   createActivity(newActivity).then(() => history.push(`/activities/${activity.id}`));
        } else {
          //  editActivity(activity).then(() => history.push(`/activities/${activity.id}`));
        }

    }

    const handleFinalFormSubmit = ( values: any ) => {
        const dateAndTime = combineDateAndTime(values.date, values.time);
        const {date, time, ...activity} =values;
        activity.date = dateAndTime
        console.log(activity);
    }

    const handleInputChange = (event: FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.currentTarget;
        setActivity({ ...activity, [name]: value })
    }

    return (

        <Grid>
            <Grid.Column width={10}>
                <Segment clearing>
                    <FinalForm
                        onSubmit={handleFinalFormSubmit}
                        render={({ handleSubmit }) => (
                            <Form onSubmit={handleSubmit}>
                                <Header as='h3' content={baslik} textAlign='center' />
                                <Field name='title' component={TextInput}  placeholder='Title' value={activity.title} />
                                <Field name='description' component={TextAreaInput} rows={3} placeholder='Description' value={activity.description} />
                                <Field name='category' component={SelectInput} options={category} placeholder='Category' value={activity.category} />
                                <Form.Group widths='equal'>

                                <Field name='date' component={DateInput}  placeholder='Date' date={true} value={activity.date} />
                                <Field name='time' component={DateInput}  placeholder='Time' time={true} value={activity.date} />

                                </Form.Group>
                                
                                <Field name='city' component={TextInput} placeholder='City' value={activity.city} />
                                <Field name='venue' component={TextInput} placeholder='Venue' value={activity.venue} />
                                <Button floated='right' type='button' content='Cancel' />
                                <Button floated='right' loading={submitting} positive type='submit' content='Submit' />
                            </Form>
                        )}

                    />

                </Segment>
            </Grid.Column>
        </Grid>
    )
}

export default observer(ActivityForm);