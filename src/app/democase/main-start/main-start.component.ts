import {Component, HostBinding, OnInit} from '@angular/core';
import {fadeInUp} from '../common/animations';
import {config} from '../common/config';

@Component({
  selector: 'free-main-start',
  templateUrl: './main-start.component.html',
  styleUrls: ['./main-start.component.css'],
  animations: [fadeInUp]
})
export class MainStartComponent implements OnInit {

  @HostBinding('@fadeInUpState') fadeInUpState;
  @HostBinding('style.display') display = 'block';
  pageTitle = 'Getting Started';
  menus: any;
  version: string;

  constructor() {
  }

  ngOnInit() {
    this.version = config.version;
    this.menus = [
      {
        title: 'freeng',
        expanded: true,
        folder: [
          {title: 'config'},
          {
            title: 'src',
            expanded: true,
            folder: [
              {
                title: 'app',
                folder: [
                  {title: 'common', file: [{title: 'config.ts'}]},
                  {title: 'component'},
                  {title: 'main'},
                  {title: 'modules', file: [{title: 'app-routing.module.ts'}, {title: 'main.module.ts'}]}
                ],
                file: [
                  {title: 'app.module.ts'},
                  {title: 'app.component.scss'},
                  {title: 'app.component.ts'},
                  {title: 'app.component.html'}
                ]
              },
              {
                title: 'assets'
              },
              {
                title: 'environments'
              }
            ],
            file: [
              {title: 'favicon.icon'},
              {title: 'index.html'},
              {title: 'main.ts'},
              {title: 'polyfills.ts'},
              {title: 'styles.css'},
              {title: 'tsconfig.app.json'},
              {title: 'typings.d.ts'}
            ]
          }
        ],
        file: [
          {
            title: '.angular-cli.json'
          },
          {
            title: '.editorconfig'
          },
          {
            title: '.gitignore'
          },
          {
            title: 'package.json'
          },
          {
            title: 'README.md'
          },
          {
            title: 'tsconfig.json'
          },
          {title: 'tslint.json'},
          {title: 'webpack.config.js'}
        ]
      }
    ];
  }
}

