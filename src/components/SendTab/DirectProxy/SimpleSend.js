import React, { Component } from 'react'
import { Tabs, TabLink, TabContent } from 'react-tabs-redux';

export default class SimpleSend extends Component {  

  render() {
    return (
      <div className="wrapper">
          
      
              <div className="container-center animated slideInDown">
      
              <Tabs>
              <div class="row">
                <div class="col-lg-6">
              <div class="tabs-container">
                        <ul class="nav nav-tabs">
                            <li class="active"><a data-toggle="tab" href="#tab-1" aria-expanded="true"><TabLink to="tab1">Tab1</TabLink></a></li>
                            <li class=""><a data-toggle="tab" href="#tab-2" aria-expanded="false"><TabLink to="tab2">Tab2</TabLink></a></li>
                            
                        </ul>

                
 
    <TabContent for="tab1"><div id="tab-1" className="tab-pane active">
                                <div className="panel-body">
                                    <strong className="c-white">value: {this.props.storageValue}</strong>

                                    <p>A wonderful serenity has taken possession of my entire soul, like these sweet mornings of spring which I enjoy with my whole heart. I am alone, and feel the charm of
                                        existence in this spot, which was created for the bliss of souls like mine.</p>

                                    <p>I am so happy, my dear friend, so absorbed in the exquisite sense of mere tranquil existence, that I neglect my talents. I should be incapable of drawing a single stroke at
                                        the present moment; and yet I feel that I never was a greater artist than now. When.</p>
                                </div>
                            </div></TabContent>
    <TabContent for="tab2"><div id="tab-2" className="tab-pane">
                                <div className="panel-body">
                                    <strong className="c-white">Donec quam felis</strong>

                                    <p>Thousand unknown plants are noticed by me: when I hear the buzz of the little world among the stalks, and grow familiar with the countless indescribable forms of the insects
                                        and flies, then I feel the presence of the Almighty, who formed us in his own image, and the breath </p>

                                    <p>I am alone, and feel the charm of existence in this spot, which was created for the bliss of souls like mine. I am so happy, my dear friend, so absorbed in the exquisite
                                        sense of mere tranquil existence, that I neglect my talents. I should be incapable of drawing a single stroke at the present moment; and yet.</p>
                                </div>
                            </div></TabContent>
                            </div>
                            </div>
                            </div>
    
</Tabs>
      
              </div>
         
          
      
      </div>
    );
  }
}