/*
Router
*/

import React from 'react';
import { Scene, Router, Tabs } from 'react-native-router-flux';
import { Images } from './theme/';
import { TabIcon } from './components';

import {
  Splash,
  Login,
  Signup,
  Search,
  Settings,
  Favourite,
  Detail,
  Map,
} from './screens/index';

const RouterComponent = () => {
  return (
    <Router>
      <Scene key="root" hideNavBar>
        <Scene
          key="splash"
          component={Splash}
          title="Splash"
          initial={true}
          hideNavBar={true}
        />
        <Scene
          key="Login"
          component={Login}
          title="Login"
          hideNavBar={true}
          gestureEnable={false}
          panHandlers={null}
        />
        <Scene
          key="Signup"
          component={Signup}
          title="Signup"
          hideNavBar={true}
        />
        <Scene
          key="Detail"
          component={Detail}
          title="Detail"
          hideNavBar={true}
        />
        <Scene key="Map" component={Map} title="Map" hideNavBar={true} />
        <Tabs
          showLabel={false}
          lazy={true}
          swipeEnabled={false}
          gestureEnable={false}
          panHandlers={null}
          tabBarStyle={{ bottom: 10 }}
          type="reset"
          key="tab">
          <Scene
            hideNavBar={true}
            key="search"
            component={Search}
            icon={({ focused }) => (
              <TabIcon
                focused={focused}
                title={'Search'}
                ImgSize={{ width: 25, height: 25 }}
                activeImg={Images.home_tab}
                defaultImg={Images.home_tab}
              />
            )}
          />
          <Scene
            hideNavBar={true}
            key="favourite"
            component={Favourite}
            icon={({ focused }) => (
              <TabIcon
                focused={focused}
                title={'Favourite'}
                ImgSize={{ width: 25, height: 25 }}
                activeImg={Images.fav_tab}
                defaultImg={Images.fav_tab}
              />
            )}
          />
          <Scene
            hideNavBar={true}
            key="settings"
            component={Settings}
            icon={({ focused }) => (
              <TabIcon
                focused={focused}
                title={'Settings'}
                ImgSize={{ width: 25, height: 25 }}
                activeImg={Images.settings_tab}
                defaultImg={Images.settings_tab}
              />
            )}
          />
        </Tabs>
      </Scene>
    </Router>
  );
};

export default RouterComponent;
