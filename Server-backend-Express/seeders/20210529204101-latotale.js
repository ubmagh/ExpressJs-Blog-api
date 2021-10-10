'use strict';
const faker = require('faker');
const UsersRepo = require('../repositories/users');
const TagsRepo = require('../repositories/tags');
const ArticlesRepo = require('../repositories/articles');

module.exports = {
  up: async (queryInterface, Sequelize) => { // commande : sequelize db:seed --seed 20210529204101-latotale.js
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    let [ users, tags, articles, articles_tags, comments ] = [ [], [], [], [], [] ];
    
    for( let i=0; i<20; i++){
      let created_at = faker.date.between('2000-01-01', '2001-12-31');
      users.push({
        username: faker.internet.userName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        role: faker.helpers.randomize([ 'admin', 'author', 'guest']),
        name: faker.name.firstName()+ ' '+ faker.name.lastName(),
        createdAt: created_at,
        updatedAt: faker.date.between( created_at, new Date())
      });
    }
    for( let i=0; i<10; i++){
      let created_at = faker.date.between('2010-01-01', '2020-12-31');
      tags.push(
        {
          name: faker.random.words(3),
          createdAt: created_at,
          updatedAt: faker.date.between( created_at, new Date())
        }
      );
    }

    const setArticles = ()=>{
      users.forEach( user => {
        let created_articles = faker.datatype.number({min:2, max:10}); // nbr d'article pour chaque utilisateur
        let createdAt = faker.date.future( faker.datatype.number({ min:2, max:19}), user.createdAt ); // une date après la date de création de l'utilisateur
        while( created_articles ){
          created_articles--;
          articles.push({
            title: faker.lorem.words(6),
            content: "e",
            image: faker.image.imageUrl(),
            UserId : user.id,
            createdAt: createdAt,
            updatedAt: faker.date.between( createdAt, new Date())
          });
        }
      });
    }

    const set_Article_Tags = ()=>{
      articles.forEach( article=>{
        let num_of_tags = faker.datatype.number({min:2, max:6}); // nbr de tags pour chaque article
        (faker.random.arrayElements( tags, num_of_tags)).forEach( tag=>{
          articles_tags.push({
            ArticleId : article.id,
            TagId: tag.id,
            createdAt: article.createdAt,
            updatedAt: faker.date.between( article.createdAt, article.updatedAt )
          });
        });
      });
    }

    const set_comments= ()=>{
      articles.forEach( article=>{
        let num_of_comments = faker.datatype.number({min:0, max:10}); // nbr de commentaires pour chaque article
        const created_at = faker.date.future( 4, article.createdAt);
        while(num_of_comments){
          comments.push({
            content : faker.lorem.sentences(4),
            ArticleId: article.id,
            UserId : (faker.random.arrayElement( users )).id,
            createdAt : created_at,
            updatedAt: faker.date.between( created_at, new Date())
          });
          num_of_comments--;
        }
      });
    };
    
    // I avoided nested promises .then( ()=>{ ...then( ()=>{ ..... } ) }  )
    await queryInterface.bulkInsert('users', users, {}).then(  // insert randomized users, it returns inserted models in Postgres only :(
      ()=> UsersRepo.getUsers() // get inserted users
      ).then( InserUsers=> {
      users = InserUsers;
      setArticles(); // prepare & randomize articles
      return queryInterface.bulkInsert('tags', tags, {}) // insert randomized tags
    }).then( 
      ()=>  TagsRepo.getAllTags()
    ).then( InserTags=>{
      tags = InserTags;
      return queryInterface.bulkInsert('articles', articles, {}) // insert randomized articles
    }).then(
      ()=>  ArticlesRepo.getAllArticles()
    ).then( InserArticles =>{
      articles = InserArticles;
      set_Article_Tags();
      return queryInterface.bulkInsert('articletags', articles_tags, {})// affect tags to articles
    }).then(()=>{
      set_comments();
      return queryInterface.bulkInsert('comments', comments, {})// affect comments to articles
    });
  },

  down: async (queryInterface, Sequelize) => { // commande : sequelize db:seed:undo --seed 20210529204101-latotale.js
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('comments', null, {}).then(
      ()=>queryInterface.bulkDelete('articletags', null, {})
    ).then(
      ()=>queryInterface.bulkDelete('articles', null, {})
    ).then(
      ()=>queryInterface.bulkDelete('tags', null, {})
    ).then(
      ()=>queryInterface.bulkDelete('users', null, {})
    )
    ;
  }
};
