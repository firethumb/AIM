import React, { Component } from 'react';



<CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
import {CardHeader,Button, CardText, CardBody, CardSubtitle, CardTitle, Row, Col, TabContent, TabPane, Nav, NavItem, NavLink, Card} from 'reactstrap';
import classnames from 'classnames';

// import classnames from 'classnames';

class Dashboard extends Component {

  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: '1'
    };
  }

toggle(tab) {
  if (this.state.activeTab !== tab) {
    this.setState({
      activeTab: tab
    });
  }
}
  render() {
    return (
      <div className="animated fadeIn">
       <div>
        <Row>
          <Col>
         <Card>
          <CardHeader>AIM</CardHeader>
            
            <CardBody>
              <Row>
                <Col>
              <CardTitle className="statusId">Vendor Loc Details </CardTitle>
              <CardSubtitle>Address: </CardSubtitle>
              <CardText>934-Salinas Drive Ext. Lahug</CardText>
               <CardSubtitle>Contact Person: </CardSubtitle>
              <CardText>0909288482</CardText>
              <hr/>
              </Col>
              <Col>
              <CardTitle className="statusId">RPI Status </CardTitle>
              <CardSubtitle>IP Address:</CardSubtitle>
              <CardText>21.23.4.2</CardText>
              <CardSubtitle>Disk:</CardSubtitle>
              <CardText>90%</CardText>
              <CardSubtitle>CPU:</CardSubtitle>
              <CardText>70%</CardText>
              <CardSubtitle>RAM:</CardSubtitle>
              <CardText>70%</CardText>
              <hr/>
              </Col>
              </Row>
              <Row>
              <Col>
              <CardTitle className="statusId">Sale Inventory </CardTitle>
              <CardSubtitle>Amount:</CardSubtitle>
              <CardText>Php:2000</CardText>
              <CardSubtitle>Sales Reset:</CardSubtitle>
              <CardText>{Date().toString()}</CardText>
              </Col>
              <Col>
              <CardTitle className="statusId">Mikrotik Status</CardTitle>
              <CardSubtitle>IP Address:</CardSubtitle>
              <CardText>21.23.4.2</CardText>
              <CardSubtitle>Disk:</CardSubtitle>
              <CardText>90%</CardText>
              <CardSubtitle>CPU:</CardSubtitle>
              <CardText>70%</CardText>
              <CardSubtitle>RAM:</CardSubtitle>
              <CardText>70%</CardText>
              </Col>
              </Row>

              
            </CardBody>
            
          </Card>
          </Col>               
  
      </Row>
   </div>

         

      
     </div>
    )
    
  }
}

export default Dashboard;
