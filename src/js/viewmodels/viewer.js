import ko from "knockout";
import obs from "../utils/observable-util";
import logger from "../logging/logger";

function Viewer(vivliostyle, viewerSettings, viewerOptions) {
    this.viewerOptions_ = viewerOptions;
    this.viewer_ = new vivliostyle.viewer.Viewer(viewerSettings, viewerOptions.toObject());
    var state_ = this.state_= {
        cfi: obs.readonlyObservable(""),
        status: obs.readonlyObservable("loading"),
        pageProgression: obs.readonlyObservable(vivliostyle.constants.LTR)
    };
    this.state = {
        cfi: state_.cfi.getter,
        status: state_.status.getter,
        pageProgression: state_.pageProgression.getter
    };

    this.setupViewerEventHandler();
    this.setupViewerOptionSubscriptions();
}

Viewer.prototype.setupViewerEventHandler = function() {
    this.viewer_.addListener("error", function(payload) {
        logger.error(payload.content);
    });
    this.viewer_.addListener("loaded", function() {
        this.state_.pageProgression.value(this.viewer_.getCurrentPageProgression());
        this.state_.status.value("complete");
    }.bind(this));
    this.viewer_.addListener("nav", function(payload) {
        var cfi = payload.cfi;
        if (cfi) {
            this.state_.cfi.value(cfi);
        }
    }.bind(this));
};

Viewer.prototype.setupViewerOptionSubscriptions = function() {
    function applyOptions() {
        this.viewer_.setOptions(this.viewerOptions_.toObject());
    }
    this.viewerOptions_.fontSize.subscribe(applyOptions, this);
};

Viewer.prototype.loadDocument = function(url, opt_documentOptions) {
    this.viewer_.loadDocument(url, opt_documentOptions);
};

Viewer.prototype.navigateToLeft = function() {
    this.viewer_.navigateToPage("left");
};

Viewer.prototype.navigateToRight = function() {
    this.viewer_.navigateToPage("right");
};

export default Viewer;