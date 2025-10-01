import { expect } from 'chai';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { mockInstrument } from '../../../mocks/mockInstrument';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonModule } from 'primeng/button';

describe('HeaderComponent', () => {
  it('debe computar headerData y color logic correctamente', () => {
    const component = new HeaderComponent();
    component.selectedInstrumentSignal = mockInstrument as any;

    const data = component.headerData;
    expect(data.name).to.equal(mockInstrument.info.name);
    expect(data.value).to.equal(mockInstrument.summary.lastPrice);
    expect(data.changePoints).to.equal(mockInstrument.summary.performanceAbsolute);
    expect(data.changePercentage).to.equal(mockInstrument.summary.performanceRelative);

    expect(component.getColor(10)).to.equal('text-green-400');
    expect(component.getColor(-5)).to.equal('text-red-400');
    expect(component.getColor(0)).to.equal('text-gray-400');
  });
});
