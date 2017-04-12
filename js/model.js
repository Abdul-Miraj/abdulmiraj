var model = (function() {
    "use strict";
    var model = {};

    /** data structures */
    var Project = function(project) {
        this.thumbnail = project.thumbnail;
        this.title = project.title;
        this.description = project.description;
        this.url = project.url;
    }

    model.init = function() {
        var pInfo = projectInfo.projects
        document.dispatchEvent(new CustomEvent('onThumbnailsLoaded', {
            'detail': pInfo
        }));
    }

    model.loadProject = function(data) {
        var res = {};
        var pInfo = projectInfo.projects

        if (data.id in pInfo) {
            res.id = data.id
            res.project = new Project(pInfo[res.id]);

            document.dispatchEvent(new CustomEvent('onProjectLoaded', {
                'detail': res
            }));

        } else {
            //TODO: dispatch error, project doesn't exist
        }


    }

    return model;

}());
