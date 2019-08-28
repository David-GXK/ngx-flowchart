import { Component, OnInit, AfterViewInit, Input } from '@angular/core';
import $ from 'jquery';
import * as d3 from 'd3';
import { CdkDragDrop, CdkDragMove, CdkDragStart, CdkDragEnd } from '@angular/cdk/drag-drop';
import { MOTION } from './directive/contents';
import { Subject, BehaviorSubject } from 'rxjs';
import { filter, timeout } from 'rxjs/operators';
declare const jsPlumb: any;
export interface Node {
  uid: string;
  text: string;
  currentX: string;
  currentY: string;
  color: string;
  iconType: string;
}
export interface CdkDragNode {
  // 显示名称
  name: string;
  color: string;
  iconType: string;
  iconColor: string;
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'ngx-flowchart-master';
  offx = 0;
  offy = 0;
  currentNodeData;
  nodeList: Node[] = [];
  cdkDragNodeList: CdkDragNode[] = [];
  motionList = MOTION;
  instance;
  enty$ = new Subject();
  code = 1;
  common = {
    // 是否可作为起点
    isSource: true,
    // 是否可作为终点
    isTarget: true,
    // 连线的类型 直线、曲线
    connector: ['Bezier', { curviness: 150 }],
    // 端点类型
    endpoint: 'Dot',
    // 端点样式
    paintStyle: {
      // 填充
      fill: 'white',
      // 角度
      radius: 5,
      // 填充颜色
      fillStyle: '#D4FFD6',
      // 描边颜色
      outlineStroke: 'blue',
      // 填充宽度
      strokeWidth: 1
    },
    // hover时的点位样式
    hoverPaintStyle: {
      outlineStroke: 'lightblue'
    },
    // 连接过程中的样式
    connectorStyle: {
      radius: 5,
      // 描边颜色
      outlineStroke: '#808080',
      strokeWidth: 2
    },
    // 连接后的样式
    connectorHoverStyle: {
      strokeWidth: 2
    },
    connectorOverlays: [
      ['PlainArrow', { width: 12, length: 12, location: 1 }],
    ],
  };
  ngAfterViewInit(): void {
    const that = this;
    const color = '#5b5a57';
    const common = {
      // 是否可作为起点
      isSource: true,
      // 是否可作为终点
      isTarget: true,
      // 连线的类型 直线、曲线
      connector: ['Bezier', { curviness: 150 }],
      // 端点类型
      endpoint: 'Dot',
      // 端点样式
      paintStyle: {
        // 填充
        fill: 'white',
        // 角度
        radius: 5,
        // 填充颜色
        fillStyle: '#D4FFD6',
        // 描边颜色
        outlineStroke: 'blue',
        // 填充宽度
        strokeWidth: 1
      },
      // hover时的点位样式
      hoverPaintStyle: {
        outlineStroke: 'lightblue'
      },
      // 连接过程中的样式
      connectorStyle: {
        radius: 5,
        // 描边颜色
        outlineStroke: '#808080',
        strokeWidth: 2
      },
      // 连接后的样式
      connectorHoverStyle: {
        strokeWidth: 2
      },
      connectorOverlays: [
        ['PlainArrow', { width: 12, length: 12, location: 1 }],
      ],
    };
    jsPlumb.ready(() => {

      that.enty$.pipe(
        filter(x => x != null)
      ).subscribe(res => {
        if (this.nodeList.length !== 0) {
          jsPlumb.addEndpoint($('#' + this.nodeList[this.nodeList.length - 1].uid), {
            anchors: ['Left']
          }, this.common);
          jsPlumb.addEndpoint($('#' + this.nodeList[this.nodeList.length - 1].uid), {
            anchors: ['Right']
          }, this.common);
          // jsPlumb.draggable($('#' + this.nodeList[j].uid));
          const aa = jsPlumb.getSelector('#' + this.nodeList[this.nodeList.length - 1].uid)[0];
          jsPlumb.draggable(aa, {
            containment: 'parent'
          });
        }
      });
      jsPlumb.addEndpoint('01_node_function', {
        anchors: ['Right']
      }, common);
      jsPlumb.addEndpoint('02_node_function', {
        anchors: ['Left']
      }, common);
      jsPlumb.addEndpoint('02_node_function', {
        anchors: ['Right']
      }, common);
      jsPlumb.addEndpoint('01_node_function', {
        anchors: ['Left']
      }, common);
      jsPlumb.draggable('01_node_function');
      jsPlumb.draggable('02_node_function');
      jsPlumb.importDefaults({
        ConnectionsDetachable: false
      });
    });
  }
  ngOnInit(): void {

  }
  viewLoad($e) {
    console.log('$e', $e);
    this.enty$.next(this.code + '');
  }
  CdkDragStarts(event: CdkDragStart) {
    console.log('CdkDragStarts', event);
  }
  cdkDragEnds(event: CdkDragEnd) {
    console.log('CdkDragEnd', event);
    const currentNode: CdkDragNode = event.source.data;
    const nodePanel: Node = {
      uid: 'node_' + this.nodeList.length,
      text: currentNode.name,
      currentX: event.distance.x + 'px',
      currentY: event.distance.y + 'px',
      color: currentNode.color,
      iconType: currentNode.iconType
    };
    this.nodeList.push(nodePanel);
    this.code++;
  }
  drop(event: CdkDragDrop<string[]>) {
    console.log('CdkDragDrop', event);
  }
}
