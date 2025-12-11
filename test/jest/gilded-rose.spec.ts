import { Item, GildedRose } from '@/gilded-rose';


describe('Gilded Rose', () => {
  it('should have sellin equal to days remaining', () => {
    const item = new Item('test item', 5, 10);
    expect(item.sellIn).toBe(5);
    expect(typeof item.sellIn).toBe('number');
  });

  it('should have quality equal to the initial quality', () => {
    const item = new Item('test item', 5, 10);
    expect(item.quality).toBe(10);
    expect(typeof item.quality).toBe('number');
  });

  it('should decrease seelin and quality at the end of the day', () => {
    const gildedRose = new GildedRose([new Item('test item', 5, 10)]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).toBe(4);
    expect(items[0].quality).toBe(9);
  });

  // quality never negative
  it('should not decrease quality below 0', () => {
    const gildedRose = new GildedRose([new Item('test item', 5, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(0);
  });

  //quality decrease twice as fast after sellin date
  it('should decrease quality twice as fast after sellin date', () => {
    const gildedRose = new GildedRose([new Item('test item', 0, 10)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(8);
  });

  // aged brie should increase in quality
  it('should increase in quality', () => {
    const gildedRose = new GildedRose([new Item('Aged Brie', 5, 10)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(11);
  });

  // aged brie should increase in quality by 2 after sellin date
  it('should increase in quality by 2 after sellin date', () => {
    const gildedRose = new GildedRose([new Item('Aged Brie', 0, 10)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(12);
  });

  // quality never more than 50
  it('should not increase quality above 50', () => {
    const gildedRose = new GildedRose([new Item('Aged Brie', 5, 50)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(50);
  });

  // sulfuras never has to be sold or decreases in quality
  it('should not decrease in quality', () => {
    const gildedRose = new GildedRose([new Item('Sulfuras, Hand of Ragnaros', 5, 10)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(10);
    expect(items[0].sellIn).toBe(5);
  });

  // backstage passes should increase in quality
  it('should increase in quality', () => {
    const gildedRose = new GildedRose([new Item('Backstage passes to a TAFKAL80ETC concert', 15, 10)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(11);
  });

  // backstage passes should increase in quality by 2 when there are 10 days or less
  it('should increase in quality by 2 when there are 10 days or less', () => {
    const gildedRose = new GildedRose([new Item('Backstage passes to a TAFKAL80ETC concert', 10, 10)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(12);
  });

  // backstage passes should increase in quality by 3 when there are 5 days or less
  it('should increase in quality by 3 when there are 5 days or less', () => {
    const gildedRose = new GildedRose([new Item('Backstage passes to a TAFKAL80ETC concert', 5, 10)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(13);
  });

  // backstage passes should drop to 0 after the concert
  it('should drop to 0 after the concert', () => {
    const gildedRose = new GildedRose([new Item('Backstage passes to a TAFKAL80ETC concert', 0, 10)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(0);
  });

  it('should foo', () => {
    const gildedRose = new GildedRose([new Item('fixme', 0, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).toBe('fixme');
  });
});