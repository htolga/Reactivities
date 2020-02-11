import React, { useContext, useEffect } from 'react'
import { Card, Image, ButtonGroup, Button } from 'semantic-ui-react'
import ActivityStore from '../../../app/stores/activityStore'
import { observer } from 'mobx-react-lite'
import { RouteComponentProps, Link } from 'react-router-dom'
import LoadingComponent from '../../../app/layout/Loading'

interface DetailsParams{
    id : string
}

const ActivityDetails : React.FC<RouteComponentProps<DetailsParams>> = ({match, history}) => {
    const activityStore = useContext(ActivityStore);    
    const {activity , loadActivity, loadingInitial} = activityStore;
    
    useEffect(() => {
        loadActivity(match.params.id)
    }, [loadActivity, match.params.id])
    
    if (loadingInitial || !activity) return <LoadingComponent content='Loading activity...' />

    return (
        <Card fluid> 
            <Image src={`/assets/categoryImages/${activity!.category}.jpg`} wrapped ui={false} />
            <Card.Content>
                <Card.Header>{activity!.title}</Card.Header>
                <Card.Meta>
                    <span>{activity!.date}</span>
                </Card.Meta>
                <Card.Description>
                    <div>{activity!.description}</div>
                    <div>{activity!.venue}</div>
                </Card.Description>
            </Card.Content>
            <Card.Content extra>
                <ButtonGroup widths={2}>
                    <Button as={Link} to={`/manage/${activity.id}`} basic color='blue' content='edit' />
                    <Button onClick={() => history.push('/activities')} basic color='grey' content='Cancel' />
                </ButtonGroup>
            </Card.Content>
        </Card>
    )
}

export default observer(ActivityDetails);