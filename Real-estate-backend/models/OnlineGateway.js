import mongoose from 'mongoose';

const onlineGatewaySchema = new mongoose.Schema(
  {
    paypalStatus: { type: String, enum: ['Active', 'Deactive'], default: 'Active' },
    paypalTestMode: { type: String, enum: ['Active', 'Deactive'], default: 'Active' },
    paypalClientId: { type: String, default: '' },
    paypalClientSecret: { type: String, default: '' },

    instaStatus: { type: String, enum: ['Active', 'Deactive'], default: 'Active' },
    instaTestMode: { type: String, enum: ['Active', 'Deactive'], default: 'Active' },
    instaApiKey: { type: String, default: '' },
    instaAuthToken: { type: String, default: '' },

    paytmStatus: { type: String, enum: ['Active', 'Deactive'], default: 'Active' },
    paytmEnv: { type: String, enum: ['Local', 'Production'], default: 'Local' },
    paytmMerchantKey: { type: String, default: '' },
    paytmMerchantMid: { type: String, default: '' },
    paytmWebsite: { type: String, default: '' },
    paytmIndustry: { type: String, default: '' },
  },
  {
    timestamps: true,
  }
);

const OnlineGateway = mongoose.model('OnlineGateway', onlineGatewaySchema);
export default OnlineGateway;
