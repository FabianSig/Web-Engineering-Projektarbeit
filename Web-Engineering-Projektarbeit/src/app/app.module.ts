import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatInputModule } from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ComparisonContainerComponent } from './comparison-container/comparison-container.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { HttpClientModule } from  '@angular/common/http';
import { GraphQLModule } from './graphql.module';
import {MatToolbarModule} from '@angular/material/toolbar';
import { CompareComponent } from './compare/compare.component';


@NgModule({
  declarations: [
    AppComponent,
    ComparisonContainerComponent,
    UserProfileComponent,
    CompareComponent
  ],
  imports: [
    MatToolbarModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    MatIconModule,
    GraphQLModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
