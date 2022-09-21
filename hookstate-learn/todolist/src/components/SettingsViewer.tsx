import React from 'react';
import { useSettingsState } from './SettingsState';

export function SettingsViewer() {
    const settingsState = useSettingsState();

    return <div style={{
        border: 'solid',
        borderWidth: 1,
        borderColor: '#09d3ac',
        marginBottom: 30,
        fontSize: '0.8em',
        display: 'flex'
    }}>
        <div id="idEditInline" style={{ flexGrow: 2, display: 'flex' }}>
            <div>
                <input
                    style={{ transform: 'scale(1.6)', marginLeft: 20 }}
                    type="checkbox"
                    checked={settingsState.isEditableInline}
                    onChange={() => settingsState.toggleEditableInline()}
                />
            </div>
            <div style={{ paddingLeft: 10, paddingBottom: 10 }}>
                edit inline
            </div>
        </div>
        <div id="idUseScopedState" style={{ flexGrow: 2, display: 'flex' }}>
            <div>
                <input
                    style={{ transform: 'scale(1.6)', marginLeft: 20 }}
                    type="checkbox"
                    checked={settingsState.isScopedUpdateEnabled}
                    onChange={() => settingsState.toggleScopedUpdate()}
                />
            </div>
            <div style={{ paddingLeft: 10, paddingBottom: 10}}>
                use scoped state
            </div>
        </div>
        <div id="idHighlightUpdates" style={{ flexGrow: 2, display: 'flex'}}>
            <div>
                <input
                    style={{ transform: 'scale(1.6)', marginLeft: 20 }}
                    type="checkbox"
                    checked={settingsState.isHighlightUpdateEnabled}
                    onChange={() => settingsState.toggleHighlightUpdate()}
                />
            </div>
            <div style={{ paddingLeft: 10, paddingBottom: 10, paddingRight: 10 }}>
                highlight updates
            </div>
        </div>
    </div>
}