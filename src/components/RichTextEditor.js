/**
 * RichTextEditor default sample
 */
import { 
    HtmlEditor, 
    Image, 
    Inject, 
    Link, 
    QuickToolbar, 
    RichTextEditorComponent, 
    Toolbar } from '@syncfusion/ej2-react-richtexteditor';

import * as React from 'react';
import { SampleBase } from './RichText-Base';
import './../rich-text-editor.css'

export class RichTextEditor extends SampleBase {
    render() {
        return (<div className='control-pane'>
        <div className='control-section' id="rte">
          <div className='rte-control-section'>
            <RichTextEditorComponent id="defaultRTE" ref={(richtexteditor) => { this.rteObj = richtexteditor; }}>
              <Inject services={[HtmlEditor, Toolbar, Image, Link, QuickToolbar]}/>
            </RichTextEditorComponent>
          </div>
        </div>

      </div>);
    }
}

export default RichTextEditor;