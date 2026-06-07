require('dotenv').config();
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

const Price = require('./models/Price');
const Country = require('./models/Country');
const Indicator = require('./models/Indicator');

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ MongoDB Connected');

    const raw = fs.readFileSync(path.join(__dirname, 'data.json'), 'utf-8');
    const data = JSON.parse(raw);
    console.log(`📦 Total records found: ${data.length}`);

    // Clear existing data
    await Price.deleteMany({});
    await Country.deleteMany({});
    await Indicator.deleteMany({});
    console.log('🗑️  Existing data cleared');

    // Seed Countries (unique)
    const countryMap = {};
    data.forEach(item => {
      if (!countryMap[item.REF_AREA]) {
        countryMap[item.REF_AREA] = item.REF_AREA_LABEL;
      }
    });
    const countries = Object.entries(countryMap).map(([code, name]) => ({ code, name }));
    await Country.insertMany(countries);
    console.log(`🌍 Countries seeded: ${countries.length}`);

    // Seed Indicators (unique)
    const indicatorMap = {};
    data.forEach(item => {
      if (!indicatorMap[item.INDICATOR]) {
        indicatorMap[item.INDICATOR] = item.INDICATOR_LABEL;
      }
    });
    const indicators = Object.entries(indicatorMap).map(([code, description]) => ({
      code,
      name: description,
      description
    }));
    await Indicator.insertMany(indicators);
    console.log(`📈 Indicators seeded: ${indicators.length}`);

    // Seed Prices
    const prices = data.map(item => ({
      countryCode: item.REF_AREA,
      indicator: item.INDICATOR,
      year: Number(item.Year),
      month: Number(item.Month),
      value: parseFloat(item.Value) || 0,
      freq: item.FREQ || 'M'
    }));

    const batchSize = 1000;
    for (let i = 0; i < prices.length; i += batchSize) {
      const batch = prices.slice(i, i + batchSize);
      await Price.insertMany(batch, { ordered: false });
      console.log(`💰 Inserted prices: ${Math.min(i + batchSize, prices.length)}/${prices.length}`);
    }

    console.log('🎉 Database seeding complete!');
  } catch (err) {
    console.error('❌ Seeding error:', err.message);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 MongoDB Disconnected');
  }
};

seedDB();