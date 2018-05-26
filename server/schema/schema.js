const graphql = require('graphql');

const _ = require('lodash');

const Item = require('../models/Item');

const { 
    GraphQLObjectType, 
    GraphQLString, 
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLFloat,
    GraphQLList,
    GraphQLNonNull
} = graphql;

/**
 * Provider type schema
 */
const ItemType = new GraphQLObjectType({
    name: 'Item',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        description: { type: GraphQLString },
        quantity: { type: GraphQLInt }
    })
});

/**
 * Define root query and mutation schemas
 */
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        findAllItems: {
            type: new GraphQLList(ItemType),
            resolve(parent, args) {
                return Item.find({});
            }
        },
        findItemById: {
            type: ItemType,
            args: { id: { type: GraphQLID }},
            resolve(parent, args) {
                return Item.findById(args.id);
            }
        }
    }
});

const RootMutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addItem: {
            type: ItemType,
            args: {
                name: { type: GraphQLNonNull(GraphQLString) },
                description: { type: GraphQLString },
                quantity: { type: GraphQLInt }
            },
            resolve(parent, args) {
                let item = new Item({
                    name: args.name,
                    description: args.description,
                    quantity: args.quantity
                });
                return item.save();
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: RootMutation
});
