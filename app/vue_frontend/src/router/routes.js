import SplashPage from '@/components/splash_page'
import OLMapPage from '@/components/ol_map_page'
import StationGraph from '@/components/station_graph'
import CameraGraph from '@/components/camera_graph'
import  ErrorPage from '@/components/error_page'
const routes = [
        {
            path: '/',
            name: 'SplashPage',
            component: SplashPage
        },
        {
            path: '/:location/map',
            name: 'OLMapPage',
            component: OLMapPage,
            children: [
                {
                    path: 'bacteriagraph/:site_id',
                    component: StationGraph,
                    name: 'StationGraph',
                    props: true
                },
                {
                    path: 'cameragraph/:camera_name',
                    component: CameraGraph,
                    name: 'CameraGraph',
                    props: true
                }

            ]

        },
        {
            path: '/page error',
            name: '404',
            component: ErrorPage
        }

    ];

export default routes
