/**
 * Created by root on 17-4-24.
 */
import { trigger, style, state, animate, transition } from '@angular/animations';

export const fadeInUp = trigger('fadeInUpState', [
  state('in', style({opacity: 1, transform: 'translate3d(0, 0, 0)'})),
  transition('void => *', [
    style({
      opacity: 0,
      transform: 'translate3d(0, 100%, 0)'
    }), animate('.4s cubic-bezier(.25,.8,.25,1)')
  ])
])

export const fadeIn = trigger('fadeInState', [
  state('in', style({opacity: 1})),
  transition('void => *', [
    style({opacity: 0}),
    animate('.3s cubic-bezier(.35,0,.25,1)')
  ])
])
