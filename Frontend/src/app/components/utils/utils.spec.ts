import { TestBed } from '@angular/core/testing';

import { Utils } from './utils';

describe('UtilsComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Utils]
    })
    .compileComponents();
  });

  it('should get the duration string correctly and in the correct format', () => {
    expect(Utils.getDurationStringFromSeconds(100)).toEqual('1m 40s');

    expect(Utils.getDurationStringFromSeconds(3610)).toEqual('1h 0m 10s');

    expect(Utils.getDurationStringFromSeconds(0)).toEqual('0s');

    expect(Utils.getDurationStringFromSeconds(-100)).toEqual('0s');
  });
});
