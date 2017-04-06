// if the database is empty on server start, create some sample data.
Meteor.startup(function () {
  Animals.remove({});
  if (Animals.find().count() === 0) {
    var animals = [];
    var snowLeopard = {
      name: "Snow Leopard",
      pictures: [
        {
          URL: "http://www.mylifescoop.net/wp-content/uploads/2012/07/00427__1.-Snow-Leopard.jpg"
        },
        {
          URL: "http://cache.gizmodo.com/assets/images/4/2009/08/Snow-Leopard-Prowl.jpg"
        },
        {
          URL: "http://24.media.tumblr.com/tumblr_lv0y7fTTcS1qjhwomo1_1280.jpg"
        },
        {
          URL: "http://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Snow_Leopard_-Taronga_Zoo-8a.jpg/800px-Snow_Leopard_-Taronga_Zoo-8a.jpg"
        },
        {
          URL: "http://1.bp.blogspot.com/-VV4BlnVeHyg/TfvC8nkJgCI/AAAAAAAAAks/KGx_W5VsHm0/s1600/baby-snow-leopard-zoom.jpg"
        },
        {
          URL: "http://wallpapersus.com/wp-content/uploads/2012/10/Snow-Leopard-Flying.jpg"
        }
      ],
      facts: [
        {
          name: "eye",
          info: "A snow leopard's eye is awesome!",
          dimensions: {
            x: 520,
            y: 170,
            width: 42,
            height: 42
          }
        },
        {
          name: "tail",
          info: "A snow leopard's tail is as long as its body!",
          dimensions: {
            x: 720,
            y: 170,
            width: 42,
            height: 42
          }
        }
      ]
    };
    animals.push(snowLeopard);
    for (var i = 0; i < animals.length; i++) {
      var animal = animals[i];
      var animal_id = Animals.insert({name: animal.name,
                                      pictures: animal.pictures,
                                      facts: animal.facts
                                      });
      console.log(Animals.findOne({_id: animal_id}));
    };
  }
  
  Meteor.users.remove({});
  if (Meteor.users.find({}).count() === 0) {
    var students = [
      {
        firstName: "Tim",
        lastName: "Shi",
        URL: "http://i.imgur.com/BlkQI5j.jpg"
      },
      {
        firstName: "Amanda",
        lastName: "Lin",
        URL: "http://i.imgur.com/6DIFRVN.jpg"
      },
      {
        firstName: "Vivian",
        lastName: "Shen",
        URL: "http://i.imgur.com/gBh0uKj.jpg"
      },
      {
        firstName: "Francisco",
        lastName: "Guzmán",
        URL: "http://i.imgur.com/ZuAAUZk.jpg"
      },
    ];
    for (var i = students.length - 1; i >= 0; i--) {
      var student = students[i];
      var combinedName = student.firstName + student.lastName;
      combinedName = combinedName.toLowerCase();
      Accounts.createUser({username: combinedName,
                           password: combinedName,
                           profile: student});
    };
  };
});
