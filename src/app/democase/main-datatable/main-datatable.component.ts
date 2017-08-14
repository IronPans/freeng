import {Component, HostBinding, OnInit} from '@angular/core';
import {fadeInUp} from '../common/animations';

@Component({
  selector: 'free-main-datatable',
  templateUrl: './main-datatable.component.html',
  styleUrls: ['./main-datatable.component.css'],
  animations: [fadeInUp]
})
export class MainDatatableComponent implements OnInit {

  @HostBinding('@fadeInUpState') fadeInUpState;
  @HostBinding('style.display') display = 'block';
  book: any;
  persons: any;
  b = {job: '{{b.job}}'};
  pageTitle = 'Components-Datatable';
  constructor() {
    this.book = [];
    this.persons = [];
  }

  ngOnInit() {
    this.book = [
      {
        'name': 'Tom Black',
        'age': 20,
        'address': 'beijing',
        'job': 'engineer'
      },
      {
        'name': 'Tom Green',
        'age': 25,
        'address': 'shanghai',
        'job': 'police'
      },
      {
        'name': 'Tom Brown',
        'age': 30,
        'address': 'guangdong',
        'job': 'nurse'
      }
    ];
    this.persons = [
      {
        'name': 'Tom Black',
        'age': 20,
        'address': 'beijing',
        'job': 'engineer'
      },
      {
        'name': 'Tom Green',
        'age': 25,
        'address': 'shanghai',
        'job': 'police'
      },
      {
        'name': 'Tom Brown',
        'age': 30,
        'address': 'guangdong',
        'job': 'nurse'
      },
      {
        'name': 'Tom Black',
        'age': 20,
        'address': 'beijing',
        'job': 'engineer'
      },
      {
        'name': 'Tom Green',
        'age': 25,
        'address': 'shanghai',
        'job': 'police'
      },
      {
        'name': 'Tom Brown',
        'age': 30,
        'address': 'guangdong',
        'job': 'nurse'
      }, {
        'name': 'Tom Black',
        'age': 20,
        'address': 'beijing',
        'job': 'engineer'
      },
      {
        'name': 'Tom Green',
        'age': 25,
        'address': 'shanghai',
        'job': 'police'
      },
      {
        'name': 'Tom Brown',
        'age': 30,
        'address': 'guangdong',
        'job': 'nurse'
      }
    ];
  }

}
