import React from 'react'
import { Redirect, Route, Switch } from 'react-router'
import { ChatScreen } from '../modules/chat/chat-screen'
import { MainScreen } from '../modules/main/main-screen'
import { News } from '../modules/news/news'
import { Personal_information } from '../modules/personal_information/Personal_information'
import { General_information } from '../modules/general_information/General_information'
import { Plan } from '../modules/plan/Plan'
import { Grants } from '../modules/grants/Grants'
import { Rating } from '../modules/rating/Rating'
import { Schedule } from '../modules/schedule/Schedule'
import { Appraisals } from '../modules/appraisals/Appraisals'
import { Questioning } from '../modules/questioning/Questioning'


export const MainRouter = () => (
    <>
        <Redirect to="/main" />

        <Switch>
            <Route exact path="/main" component={MainScreen} />
            <Route exact path="/chat" component={ChatScreen} />
            <Route exact path="/news" component={News} />
            <Route exact path="/personal_information" component={Personal_information} />
            <Route exact path="/general_information" component={General_information} />
            <Route exact path="/plan" component={Plan} />
            <Route exact path="/grants" component={Grants} />
            <Route exact path="/rating" component={Rating} />
            <Route exact path="/schedule" component={Schedule} />
            <Route exact path="/appraisals" component={Appraisals} />
            <Route exact path="/questioning" component={Questioning} />
        </Switch>
    </>
)