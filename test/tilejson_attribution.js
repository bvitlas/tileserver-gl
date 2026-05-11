import { expect } from 'chai';

import {
  DEFAULT_MAPPINEST_TILEJSON_ATTRIBUTION,
  mergeTilejsonAttribution,
} from '../src/utils.js';

describe('mergeTilejsonAttribution', function () {
  const originalDefaultAttribution = process.env.DEFAULT_TILEJSON_ATTRIBUTION;

  afterEach(function () {
    if (originalDefaultAttribution === undefined) {
      delete process.env.DEFAULT_TILEJSON_ATTRIBUTION;
    } else {
      process.env.DEFAULT_TILEJSON_ATTRIBUTION = originalDefaultAttribution;
    }
  });

  it('sets Mappinest attribution when existing attribution is missing', function () {
    expect(mergeTilejsonAttribution(undefined)).to.equal(
      DEFAULT_MAPPINEST_TILEJSON_ATTRIBUTION,
    );
    expect(mergeTilejsonAttribution(null)).to.equal(
      DEFAULT_MAPPINEST_TILEJSON_ATTRIBUTION,
    );
    expect(mergeTilejsonAttribution('   ')).to.equal(
      DEFAULT_MAPPINEST_TILEJSON_ATTRIBUTION,
    );
  });

  it('appends Mappinest attribution to existing attribution', function () {
    expect(mergeTilejsonAttribution('© OpenStreetMap')).to.equal(
      `© OpenStreetMap, ${DEFAULT_MAPPINEST_TILEJSON_ATTRIBUTION}`,
    );
  });

  it('does not duplicate existing Mappinest attribution', function () {
    const attribution =
      '© OpenStreetMap, <a href="https://www.mappinest.com/legal/terms">Mappinest</a>';

    expect(mergeTilejsonAttribution(attribution)).to.equal(attribution);
  });

  it('uses DEFAULT_TILEJSON_ATTRIBUTION from the environment', function () {
    process.env.DEFAULT_TILEJSON_ATTRIBUTION =
      '<a href="https://example.test/terms">Custom attribution</a>';

    expect(mergeTilejsonAttribution('© OpenStreetMap')).to.equal(
      '© OpenStreetMap, <a href="https://example.test/terms">Custom attribution</a>',
    );
  });
});
