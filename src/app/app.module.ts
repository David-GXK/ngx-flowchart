import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgZorroAntdModule, NZ_I18N, zh_CN } from 'ng-zorro-antd';
import { AppComponent } from './app.component';
import { DndModule } from 'ngx-drag-drop';
import { DragDropModule } from '@angular/cdk/drag-drop';
/*
 * 配置 angular i18n
 */
import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';
import { FlowchartSiderDirective } from './directive/flowchart-sider.directive';
registerLocaleData(zh);

@NgModule({
  declarations: [
    AppComponent,
    FlowchartSiderDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    /*
     *  导入 ng-zorro-antd 模块
    */
    NgZorroAntdModule,
    DndModule,
    DragDropModule
  ],
  bootstrap: [AppComponent],
  /*
   *  配置 ng-zorro-antd 国际化（文案 及 日期）
  */
  providers: [
    { provide: NZ_I18N, useValue: zh_CN }
  ]
})
export class AppModule { }
