import * as React from 'react';
export default class Props {
    children: Array<React.ReactElement<any>> | React.ReactElement<any> | never[];
    speed: number;
    height: number;
    animation: string;
    isAuto: boolean;
    autoPlayInterval: number;
    showDots: boolean;
}
