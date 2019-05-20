import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatGridListModule } from '@angular/material/grid-list';



import { AppRoutingModule } from './app-routing.module';
import { DayComponent } from '../components/day/day.component';
import { DayWithTargetComponent } from '../components/day-with-target/day-with-target.component';
import { AddictionInfoComponent } from '../components/addiction-info/addiction-info.component';
import { AddictionComponent } from '../components/addiction/addiction.component';
import { RelationShipComponent } from '../components/relation-ship/relation-ship.component';
import { BarComponent } from '../components/bar/bar.component';
import { CardComponent } from '../components/card/card.component';
import { BigTestComponent } from '../components/big-test/big-test.component';
import { SafeHtmlPipe } from '../pipes/safe-html.pipe';
import { SwipeComponent } from '../components/swipe/swipe.component';
import { GameStatusComponent } from '../components/game-status/game-status.component';
import { LosepageComponent } from '../components/losepage/losepage.component';
import { IconContinerComponent } from '../components/icon-continer/icon-continer.component';



@NgModule({
    declarations: [
        DayComponent,
        DayWithTargetComponent,
        AddictionInfoComponent,
        AddictionComponent,
        RelationShipComponent,
        BarComponent,
        CardComponent,
        BigTestComponent,
        SafeHtmlPipe,
        SwipeComponent,
        GameStatusComponent,
        LosepageComponent,
        IconContinerComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MatCardModule,
        MatButtonModule,
        MatProgressBarModule,
        MatGridListModule
    ],
    providers: [],
    bootstrap: [BigTestComponent]
})
export class AppModule { }
