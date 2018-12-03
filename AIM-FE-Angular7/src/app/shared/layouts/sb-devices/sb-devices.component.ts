import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { deviceService } from '../../services/device.service';
import { GlobalService } from '../../services/global.service';

@Component({
  selector: 'sb-devices',
  templateUrl: './sb-devices.component.html',
  styleUrls: ['./sb-devices.component.scss'],
  providers: [deviceService]
})
export class SbdevicesComponent implements OnInit {


  public deviceInfo: Array<any> = [];
  public sidebarToggle = true;

  constructor(private _deviceService: deviceService,
    public _globalService: GlobalService) { }

  ngOnInit() {
    this.deviceInfo = this._deviceService.putSidebarJson();
    this._sidebarToggle();
    this._deviceService.selectItem(this.deviceInfo); /* ----->初始化判断路由isActive状态  未完成  待优化 */
    this._isSelectItem(this.deviceInfo);
  }

  public _sidebarToggle() {
    // this._globalService._sidebarToggleState(true);
    /* this._globalService.sidebarToggle$.subscribe(sidebarToggle => {
      this.sidebarToggle = sidebarToggle;
    }, error => {
      console.log('Error: ' + error);
    }); */
    this._globalService.data$.subscribe(data => {
      if (data.ev === 'sidebarToggle') {
        this.sidebarToggle = data.value;
      }
    }, error => {
      console.log('Error: ' + error);
    });
  }

  /* 初始化 判断当前路由状态信息 首次加载菜单状态 */
  _isSelectItem(item) {
    for (const i in item) {
      if (item[i].children) {
        for (const index in item[i].children) {
          if (item[i].children[index].isActive || item[i].children[index].toggle === 'on') {
            item[i].toggle = 'on';
            break;
          } else {
            this._isSelectItem(item[i].children);
          }
        }
      }
    }
  }

}
