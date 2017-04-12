(function(model, view) {
    "use strict";

    /** View Listeners */
    document.addEventListener('onDocumentLoaded', function(e) {
        model.init();
    });

    document.addEventListener('onThumbnailClicked', function(e) {
        model.loadProject(e.detail);
    });

    /** Model Listeners */

    document.addEventListener('onProjectLoaded', function(e) {
        view.hideProjectThumbnails();
        view.createProjectPage(e.detail);
    });

    document.addEventListener('onThumbnailsLoaded', function(e) {
        view.loadProjectThumbnails(e.detail);
    });

}(model, view));
