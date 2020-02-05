import React from 'react'
import { Card, Image, ButtonGroup, Button } from 'semantic-ui-react'
import { IActivity } from '../../../app/models/activity'

interface IProps
{
    activity: IActivity;
    setEditMode :(editMode: boolean) => void;
    setSelectedActivity : (activity : IActivity | null) => void ;
}

export const ActivityDetails : React.FC<IProps> = ({activity, setEditMode, setSelectedActivity}) => {
    return (
        <Card fluid> 
            <Image src={`/assets/categoryImages/${activity.category}.jpg`} wrapped ui={false} />
            <Card.Content>
                <Card.Header>{activity.title}</Card.Header>
                <Card.Meta>
                    <span>{activity.date}</span>
                </Card.Meta>
                <Card.Description>
                    <div>{activity.description}</div>
                    <div>{activity.venue}</div>
                </Card.Description>
            </Card.Content>
            <Card.Content extra>
                <ButtonGroup widths={2}>
                    <Button onClick={() => setEditMode(true)} basic color='blue' content='edit' />
                    <Button onClick={() => setSelectedActivity(null)} basic color='grey' content='Cancel' />
                </ButtonGroup>
            </Card.Content>
        </Card>
    )
}
