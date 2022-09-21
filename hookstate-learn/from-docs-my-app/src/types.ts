import React from 'react';
/// <reference path="../node_modules/@types/react/global.d.ts" />

declare module 'react' {
  export interface EventTarget {
    tagName: string;
  }
}
