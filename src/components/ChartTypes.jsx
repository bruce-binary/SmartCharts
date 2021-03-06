/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import { connect } from '../store/Connect';
import Menu from './Menu.jsx';
import List from './List.jsx';
import { CloseIcon, SettingIcon } from './Icons.jsx';
import '../../sass/components/_chart-types.scss';

const ChartTypes = ({
    Type,
    Menu,
    menuOpen,
    setOpen,
    onChange,
    ChartTypeList,
    showAggregateDialog,
    closeMenu,
    isMobile,
    enabled,
}) => {
    if (Type === undefined) return (null);

    const onItemClick = (idx, chartType) => {
        if (Type.id !== chartType.id) {
            onChange(chartType.id);
        }
        setOpen(false);
    };

    return (
        <Menu
            className="ciq-display collapse ciq-chart-types"
            enabled={enabled}
        >
            <Menu.Title>
                <Type.icon
                    className={`ic-icon-with-sub ${menuOpen ? 'active' : ''}`}
                    tooltip-title={t.translate(Type.text)}
                />
            </Menu.Title>
            <Menu.Body>
                <div className="title">
                    <div className="mobile-title">{t.translate('Chart types')}</div>
                    {isMobile ? <CloseIcon className="icon-close-menu" onClick={closeMenu} /> : '' }
                </div>
                <div className="body">
                    <ChartTypeList
                        height={260}
                        onItemClick={onItemClick}
                    >
                        {T => (
                            <React.Fragment>
                                <span className="left">
                                    <T.icon  className={`margin ${T.active ? 'active' : ''}`} />
                                    <span className="ciq-icon-text">{T.text}</span>
                                </span>
                                {T.settingsOnClick &&
                            <span
                                className="ciq-aggregate-setting"
                                onClick={() => showAggregateDialog(T.id)}
                            >
                                <SettingIcon />
                            </span>}
                            </React.Fragment>
                        )}
                    </ChartTypeList>
                </div>
            </Menu.Body>
        </Menu>
    );
};

export default connect(({ chartType }) => ({
    Type: chartType.type,
    setOpen: chartType.menu.setOpen,
    onChange: chartType.setTypeFromUI,
    showAggregateDialog: chartType.showAggregateDialog,
    menuOpen: chartType.menu.open,
    Menu: chartType.menu.connect(Menu),
    ChartTypeList: chartType.list.connect(List),
    closeMenu: chartType.menu.onTitleClick,
    isMobile: chartType.mainStore.chart.isMobile,
}))(ChartTypes);
