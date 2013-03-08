if (Meteor.isClient) {
  DocumentCollection = new Meteor.Collection(null);

  var items = [{
    _id: 1,
    title: "One"
  }, {
    _id: 2,
    title: "Two"
  }];

  function seed () {
    for (var i = 0; i < 3; i++) {
      DocumentCollection.insert({
        title: "Document " + i
      });
    }
  }

  Meteor.startup(seed);

  Template.list.helpers({
    items: function () {
      // Returns a Cursor. This works hand in hand with the
      // {{#each items}} helper to only update the individual
      // list dom items that have changed
      return DocumentCollection.find();
    },

    onlyParentTemplateReactivelyUpdates: function () {
      // Calling find() sets up a reactive context. So if any data in
      // the cursor changes, this context will be invalidated and the
      // list template will be re-rendered. The key takeaway is that
      // all children templates will be re-rendered as well.
      var array = DocumentCollection.find().fetch();
      return array;
    }

    notReactiveItems: function () {
      // This just returns an array. An array is not a "reactive data source"
      // so it doesn't invalidate contexts when data has changed and the 
      // template won't re-render.
      return items;
    }
  });

  Template.list.rendered = function () {
    console.log("rendered list");
  };

  Template.listItem.rendered = function () {
    console.log("rendered listItem");
  };
}
