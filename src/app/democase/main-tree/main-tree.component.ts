import {Component, OnInit, HostBinding} from '@angular/core';
import {fadeInUp} from '../common/animations';
import {MainTreeService} from './main-tree.service';

@Component({
  selector: 'free-main-tree',
  templateUrl: './main-tree.component.html',
  styleUrls: ['./main-tree.component.css'],
  animations: [fadeInUp],
  providers: [MainTreeService]
})

export class MainTreeComponent implements OnInit {

  @HostBinding('@fadeInUpState') fadeInUpState;
  @HostBinding('style.display') display = 'block';
  pageTitle = 'Components-Tree';
  tree1: any;
  tree2: any;
  tree3: any;
  tree4: any;
  tree5: any;
  tree6: any;
  loading: boolean;
  node: any;
  selectedFile: any;
  selectedFiles2: any;

  constructor(private mainTreeService: MainTreeService) {
    this.selectedFiles2 = [];
    this.selectedFile = [];
    this.node = {};
    this.loading = true;
  }

  ngOnInit() {
    this.mainTreeService.getFiles().subscribe(files => this.tree1 = files['data']);
    this.mainTreeService.getFiles().subscribe(files => this.tree2 = files['data']);
    this.mainTreeService.getFiles().subscribe(files => this.tree3 = files['data']);
    this.mainTreeService.getLazyFiles().subscribe(files => this.tree4 = files['data']);
    this.mainTreeService.getFiles().subscribe(files => this.tree5 = files['data']);
    this.mainTreeService.getLazyFiles().subscribe(files => {
      setTimeout(() => {
        this.tree6 = files['data'];
        this.loading = false;
      }, 1000);
    });
  }

  nodeExpand(event) {
    if (event.node) {
      this.mainTreeService.getLazyFiles().subscribe(nodes => event.node.children = nodes['data']);
    }
  }
}

