/* global describe, it */

// run: "mocha tests/"

var assert = require('assert');
var counter = require('../');


describe('counting', function () {

  [
    "J'arrache vos souvenirs, les brise en morceaux et vous enfonce chaque fragment dans l'âme. Je taille vos peurs en pointes, forge vos angoisses en lames aiguisées et sculpte vos terreurs en griffes acérées. Je noie, je brûle, je viole.Je déteste mon travail. Je suis faiseur de cauchemars.",
    "Depuis plusieurs jours l'angoisse montait en moi. Ne risquais-je pas de tous nous condamner à la moindre erreur ? À quelques secondes de la rencontre, je ne pouvais plus reculer. J'ajustai une dernière fois ma cravate et passai le sas. Ils m'accueillirent : « Ambassadeur de la Terre, bienvenue ! »",
    "Stéphane, pressé, optimisa son trajet : à deux mètres cinquante du distributeur, pour être pile en face des portes du tramway, portes qui s'ouvrirent exactement sur le tunnel du métro, puis le troisième wagon, pour être le premier dans l'escalier à Saint-Lazare. Voie 6, 25 minutes d'attente.",
    "C'est la sixième fois qu'on enterre grand père. Chaque fois c'est pareil, on le met en terre et quelques mois plus tard, il rentre à la maison comme si tout allait bien et le cercueil est vide. Presque plus personne ne pleure. On s'habitue à tout.",
    "Je l'ai aimée au premier regard. On s'est baladés, je l'ai trouvée parfaite et je l'ai ramenée chez moi. Pendant des années, on a formé un tandem, elle m'a porté, je l'ai poussée. Mais aujourd’hui, on se sépare, elle est cassée. Adieu chère bicyclette.",
    "Nos lèvres se cherchent, nos peaux se frôlent, nos langues se trouvent, nos vêtements se défont. Ses mains explorent mon corps, sa bouche découvre mon sexe,  je piège sa tête entre mes jambes, je sens sa barbe contre mes cuisses. Il me pénètre, je jouis, et pense à mon ex.",
    "Aujourd’hui ma vie a changé. La voiture m'a percuté, ma jambe a été arrachée. Et là j'ai découvert avec horreur les câbles électriques et les vérins sortant de mon genou et qu'à la place du sang, c'était de l'huile qui se répandait sur le sol...",
    "Je viens de récupérer le message, une plaque de métal attachée à la sonde. Pas de texte, seulement des dessins. Plein de lignes que je ne comprends pas encore, un schéma de la sonde et deux aliens. Je crois qu'ils nous invitent, il y a une adresse. Allons-y !",
    "Les doigts tremblants et les yeux humides, j'allume les bougies de son gâteau. Une, deux et trois. La gorge serrée, je me force à chanter « Joyeux anniversaire ». Comme chaque année c'est moi qui les souffle et fais un vœu. Toujours le même. Celui qu'il revienne parmi nous.",
    "Lot numéro 17. Issu des fouilles en cours en Europe, un authentique disque de données, estimé contemporain des derniers empereurs de Schengen, fin XXIIe siècle ancien calendrier. Il est de type rayon bleu et contient un documentaire de voyage intitulé «Le Hobbit». La mise à prix est de 250 crédits.",
    "Il conclut avec un point final et se relut. Son texte était fluide et le style agréable. En se relisant, il se rendit compte qu'il n'était pas dénué de talent et qu'il pourrait sans doute poursuivre une carrière d'écrivain. Il déchira alors sa lettre de suicide.",
    "Bienvenue dans ma tête, suivez le guide ! Sautez de neurone en neurone, accrochez vous bien aux synapses. Attention à où vous posez les pieds, c'est assez fragile. Admirez ici la zone mémorielle : sur votre gauche, un doux souvenir d'enfance, sur votre droite un traumatisme, aussi d'enfance, malheureusement.",
    "Consciousness Uploader v2.3 : votre conscience va être numérisée et chargée dans le réseau. Conformément à la loi sur l'identité unique, l'originale sera mise en pause. En choisissant de continuer, vous acceptez que les informations obtenues lors de la copie soient utilisées à des fins commerciales.[ OK | Annuler ]",
    "Tu la traques depuis des semaines. Ce soir, tu la suis chez elle. Tu sens son parfum derrière elle. L'anticipation t'excite. Elle te voit. Tu saisis sa gorge avant qu'elle ne crie. Tu serres, fort. Sa trachée cède. Tu es déçu. Pas aussi bien que la dernière.",
    "Tu fais quoi dans la vie ? Non, pas ton métier. Je te demande ce que tu fais dans la *vraie* vie, pas au travail. Qu'est-ce que tu fais le soir, les week-ends, qu'est-ce qui te passionne vraiment ? Ah... Et sinon, ton boulot, ça te plait ?"
  ].forEach(function (text) {
    it('should count 50 words in [[' + text + ']]', function () {
      assert.equal(50, counter(text).count);
    });

  });

  it('should count hyphens', function () {

    var result = counter('peut-être');
    assert.equal(result.count, 2);

    assert.equal(result.words[0].value, 'peut');
    assert.equal(result.words[0].start, 0);
    assert.equal(result.words[0].end, 3);

    assert.equal(result.words[1].value, 'être');
    assert.equal(result.words[1].start, 5);
    assert.equal(result.words[1].end, 8);

  });

  it('should count apostrophes', function () {
    var result = counter('j\'ai');
    assert.equal(result.count, 2);

    assert.equal(result.words[0].value, 'j');
    assert.equal(result.words[0].start, 0);
    assert.equal(result.words[0].end, 0);

    assert.equal(result.words[1].value, 'ai');
    assert.equal(result.words[1].start, 2);
    assert.equal(result.words[1].end, 3);

  });

  it('should ignore euphonic "t"', function () {

    var result = counter('viendra-t-il ?');
    assert.equal(result.count, 2);

    assert.equal(result.words[0].value, 'viendra');
    assert.equal(result.words[0].start, 0);
    assert.equal(result.words[0].end, 6);

    assert.equal(result.words[1].value, 'il');
    assert.equal(result.words[1].start, 10);
    assert.equal(result.words[1].end, 11);

  });

  it('should ignore euphonic "l"', function () {

    var result = counter('l\'on');
    assert.equal(result.count, 1);

    assert.equal(result.words[0].value, 'on');
    assert.equal(result.words[0].start, 2);
    assert.equal(result.words[0].end, 3);

  });


  it('should count correctly with garbage characters', function () {

    var result = counter('_*peut--être//');
    assert.equal(result.count, 2);

    assert.equal(result.words[0].value, 'peut');
    assert.equal(result.words[0].start, 2);
    assert.equal(result.words[0].end, 5);

    assert.equal(result.words[1].value, 'être');
    assert.equal(result.words[1].start, 8);
    assert.equal(result.words[1].end, 11);

  });

});
