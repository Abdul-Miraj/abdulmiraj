(function(model, view) {
    "use strict";

    /** View Listeners */
    document.addEventListener('onDocumentLoaded', function(e) {
        //TODO:
    });

    document.addEventListener('onThumbnailClicked', function(e) {
        model.loadProject(e.detail);
    });

    /** Model Listeners */

    document.addEventListener('onProjectLoaded', function(e) {
        view.hideProjectThumbnails();
        view.createProjectPage(e.detail);
    });

}(model, view));
