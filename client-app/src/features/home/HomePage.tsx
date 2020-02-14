import React from 'react'
import { Container, Segment, Header, Button, Image } from 'semantic-ui-react'
import { Link } from 'react-router-dom';

const HomePage = () => {
    return (
            <Segment inverted textAlign='center' vertical className='masthead' >
                <Container text>
                    <Header as='h1' inverted>
                        <Image size='massive' src='/assets/logo.png' alt='logo' style={{marginBottom: 12}}/>
                        Öğretmen Öğrenci arasında veri iletişim platformu
                    </Header>
                    <Header as='h2' inverted content='Platforma Hoşgeldiniz' />
                    <Button as={Link} to='/activities' size='huge' inverted>
                        Giriş Yap!
                    </Button>
                </Container>
            </Segment>
    )
}

export default HomePage;