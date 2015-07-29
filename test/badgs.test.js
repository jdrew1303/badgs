import Badgs from '../src';

describe('Badgs', function () {
  describe('#constructor', function () {
    it('should require template if exists', function () {
      assert.isDefined(new Badgs('flat').template);
    });

    it('should use default template if nothing passed', function () {
      assert.isDefined(new Badgs().template);
    });

    it('should thorw an error of passed template name but there`s no such template', function () {
      assert.throws(() => new Badgs('bugagaga'));
    });

    it('should use custom template function if passed', function () {
      function customTemplate() { }

      assert.equal(new Badgs(customTemplate).template, customTemplate);
    });
  });

  describe('#mapColor', function () {
    const badg = new Badgs();

    it('should map color by name', function () {
      assert.equal(badg.mapColor('red'), '#e05d44');
    });

    it('should return #hex if hex passed', function () {
      assert.equal(badg.mapColor('333'), '#333');
      assert.equal(badg.mapColor('313131'), '#313131');
    });

    it('should return default color otherwise', function () {
      assert.equal(badg.mapColor('asdasdsadsad333'), '#9f9f9f');
    });
  });

  describe('#capCorrection', function () {
    const badg = new Badgs();

    it('should add correction for each capital letter in word', function () {
      assert.equal(badg.capCorrection('WordWithFourCaps'), 1.6);
    });
  });

  describe('#calcWidth', function () {
    const badg = new Badgs();

    it('should correctly caluclate width for word container', function () {
      assert.equal(badg.calcWidth('WordWithFourCaps'), 146);
    });
  });

  describe('#render', function () {
    it('should pass correct arguments to template function', function (done) {
      const badgLocal = new Badgs(params => {
        assert.isDefined(params.subject);
        assert.isDefined(params.status);
        assert.isDefined(params.color);
        assert.isDefined(params.widthA);
        assert.isDefined(params.widthB);

        assert.equal(params.subject, 'subject');
        assert.equal(params.status, 'status');

        done();
      });

      badgLocal.render('subject', 'status', 'red');
    });
  });
});