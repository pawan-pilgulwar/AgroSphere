import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    // Personal Information
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,   
    },
    phone: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },

    // Business Information
    businessName: {
        type: String,
        required: true,
    },
    businessType: {
        type: String,
        enum: ['individual', 'company', 'cooperative'],
        default: 'individual',
        required: true,
    },
    taxId: {
        type: String,
        required: false,
    },
    businessAddress: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    state: {
        type: String,
        required: true,
    },
    zipCode: {
        type: String,
        required: true,
    },

    // Farm Information
    farmSize: {
        type: Number,
        required: false,
    },
    farmLocation: {
        type: String,
        required: false,
    },
    farmingExperience: {
        type: Number,
        required: false,
    },
    primaryProducts: [{
        type: String,
        enum: [
            'Vegetables',
            'Fruits',
            'Grains',
            'Dairy',
            'Meat',
            'Poultry',
            'Eggs',
            'Honey',
            'Herbs',
            'Flowers',
            'Organic Products',
            'Processed Foods'
        ]
    }],

    // Additional Information
    certifications: [{
        type: String,
        enum: [
            'Organic',
            'GAP (Good Agricultural Practices)',
            'HACCP',
            'Fair Trade',
            'Rainforest Alliance',
            'None'
        ]
    }],
    preferredPaymentMethods: [{
        type: String,
        enum: [
            'Credit Card',
            'Bank Transfer',
            'Cash on Delivery',
            'Mobile Payment'
        ]
    }],
    marketingConsent: {
        type: Boolean,
        default: false,
    },

    // System Fields
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    isActive: {
        type: Boolean,
        default: true,
    }
});

// Update the updatedAt field before saving
userSchema.pre('save', function(next) {
    this.updatedAt = new Date();
    next();
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
