const { Schema, model, Types } = require('mongoose');

const reactionsSchema = new mongoose.Schema({
    reactionId: { //mongoose.ObjectId, 
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId(),
    },
    reactionBody: {
        type: string,
        required: true,
        max: 280
    },
    username: {
        type: string,
        required: true
    },
    createdAt: {
        type: Date,
        timestamp: {
            type: Date,
            default: Date.now,
            toJSON: { getters: true, virtuals: true }
        },
    }
});

const thoughtsSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            min: 1,
            max: 280
        },
        createdAt: {
            type: Date,
            timestamp: {
                type: Date,
                default: Date.now,
                toJSON: { getters: true, virtuals: true }
            },

        },
        username: {
            type: String,
            required: true
        },
        reactions: [
            reactionsSchema
        ],
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
);

thoughtsSchema
    .virtual('reactionCount')
    .get(function () {
        return this.reactions.length;
    });

const Thoughts = model('thoughts', thoughtsSchema);

module.exports = Thoughts;