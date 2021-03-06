import TimeperiodStore from './TimeperiodStore';
import ChartStore from './ChartStore';
import ChartTypeStore from './ChartTypeStore';
import StudyLegendStore from './StudyLegendStore';
import ComparisonStore from './ComparisonStore';
import DrawToolsStore from './DrawToolsStore';
import ChartTitleStore from './ChartTitleStore';
import AssetInformationStore from './AssetInformationStore';
import ComparisonListStore from './ComparisonListStore';
import ViewStore from './ViewStore';
import CrosshairStore from './CrosshairStore';
import ShareStore from './ShareStore';
import ChartSettingStore from './ChartSettingStore';
import LoaderStore from './LoaderStore';
import FavoriteSessionStore from './FavoriteSessionStore';
import ChartSizeStore from './ChartSizeStore';
import RoutingStore from './RoutingStore';

export default class MainStore {
    favoriteSessionStore = new FavoriteSessionStore();
    chart = new ChartStore(this);
    chartType = new ChartTypeStore(this);
    studies = new StudyLegendStore(this);
    comparison = new ComparisonStore(this);
    drawTools = new DrawToolsStore(this);
    chartTitle = new ChartTitleStore(this);
    timeperiod = new TimeperiodStore(this);
    assetInformation = new AssetInformationStore(this);
    comparisonList = new ComparisonListStore(this);
    view = new ViewStore(this);
    crosshair = new CrosshairStore(this);
    share = new ShareStore(this);
    chartSetting = new ChartSettingStore(this);
    loader = new LoaderStore();
    chartSize = new ChartSizeStore(this);
    routing = new RoutingStore(this);
}
