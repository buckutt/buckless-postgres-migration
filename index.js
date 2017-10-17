const config = require('./config');
const r = require('rethinkdbdash')(config.rdb);
const knex = require('knex')(config.pql);
const uuid = require('uuid');
const { chunkify, defaultMail } = require('./utils');
const foreignKeys = require('./foreignKeys').up;

/**
 * ok devicePoint -> wiket
 * ok userGroup -> memberships
 * ok user --n:n--> right becomes user --1:n--> right
 * ok article --n:n--> price becomes article --1:n--> price
 * ok promotion --n:n--> price becomes promotion --1:n--> price
 * ok remove promotions:articles
 * promotions:articles --> promotions:sets with set containing one article
 */

console.log('Starting migration\n');

structure()
    .then(() => {
        console.log('  ✓ structure');
        return emptyDb();
    })
    .then(() => {
        console.log('  ✓ empty database');
        return copyArticles();
    })
    .then(() => {
        console.log('  ✓ articles');
        return copyCategories();
    })
    .then(() => {
        console.log('  ✓ categories');
        return copyDevices();
    })
    .then(() => {
        console.log('  ✓ devices');
        return copyWikets();
    })
    .then(() => {
        console.log('  ✓ wikets');
        return copyEvents();
    })
    .then(() => {
        console.log('  ✓ events');
        return copyFundations();
    })
    .then(() => {
        console.log('  ✓ fundations');
        return copyGroups();
    })
    .then(() => {
        console.log('  ✓ groups');
        return copyMemberships();
    })
    .then(() => {
        console.log('  ✓ memberships');
        return copyMeansoflogins();
    })
    .then(() => {
        console.log('  ✓ meansoflogins');
        return copyPeriods();
    })
    .then(() => {
        console.log('  ✓ periods');
        return copyPoints();
    })
    .then(() => {
        console.log('  ✓ points');
        return copyPrices();
    })
    .then(() => {
        console.log('  ✓ prices');
        return copyPromotions();
    })
    .then(() => {
        console.log('  ✓ promotions');
        return copyPurchases();
    })
    .then(() => {
        console.log('  ✓ purchases');
        return copyRefunds();
    })
    .then(() => {
        console.log('  ✓ refunds');
        return copyReloads();
    })
    .then(() => {
        console.log('  ✓ reloads');
        return copyRights();
    })
    .then(() => {
        console.log('  ✓ rights');
        return copySets();
    })
    .then(() => {
        console.log('  ✓ sets');
        return copyTransfers();
    })
    .then(() => {
        console.log('  ✓ transfers');
        return copyUsers();
    })
    .then(() => {
        console.log('  ✓ users');
        return copyArticleCategories();
    })
    .then(() => {
        console.log('  ✓ articles - categories');
        return copyArticlePrices();
    })
    .then(() => {
        console.log('  ✓ articles - prices');
        return copyArticlePromotions();
    })
    .then(() => {
        console.log('  ✓ articles - promotions');
        return copyArticlePurchases();
    })
    .then(() => {
        console.log('  ✓ articles - purchases');
        return copyArticleSets();
    })
    .then(() => {
        console.log('  ✓ articles - sets');
        return copyCategoryPoints();
    })
    .then(() => {
        console.log('  ✓ categories - points');
        return copyPromotionPrices();
    })
    .then(() => {
        console.log('  ✓ promotions - prices');
        return copyPromotionSets();
    })
    .then(() => {
        console.log('  ✓ promotions - sets');
        return copyUserRights();
    })
    .then(() => {
        console.log('  ✓ user - rights');
        return foreignKeys(knex);
    })
    .then(() => {
        console.log('  ✓ foreignKeys');
        process.exit(0);
    })
    .catch((err) => {
        console.log(err);
        process.exit(1);
    });

function structure() {
    return knex.migrate.latest()
}

function emptyDb() {
    return knex.raw('truncate table articles')
        .then(() => knex.raw('truncate table categories'))
        .then(() => knex.raw('truncate table devices'))
        .then(() => knex.raw('truncate table wikets'))
        .then(() => knex.raw('truncate table events'))
        .then(() => knex.raw('truncate table fundations'))
        .then(() => knex.raw('truncate table groups'))
        .then(() => knex.raw('truncate table memberships'))
        .then(() => knex.raw('truncate table meansoflogin'))
        .then(() => knex.raw('truncate table meansofpayment'))
        .then(() => knex.raw('truncate table periods'))
        .then(() => knex.raw('truncate table points'))
        .then(() => knex.raw('truncate table prices'))
        .then(() => knex.raw('truncate table promotions'))
        .then(() => knex.raw('truncate table purchases'))
        .then(() => knex.raw('truncate table refunds'))
        .then(() => knex.raw('truncate table reloads'))
        .then(() => knex.raw('truncate table rights'))
        .then(() => knex.raw('truncate table sets'))
        .then(() => knex.raw('truncate table transfers'))
        .then(() => knex.raw('truncate table users'))
        .then(() => knex.raw('truncate table articles_categories'))
        .then(() => knex.raw('truncate table articles_sets'))
        .then(() => knex.raw('truncate table articles_purchases'))
        .then(() => knex.raw('truncate table categories_points'))
        .then(() => knex.raw('truncate table promotions_sets'));
}

function copyArticles() {
    return r.table('Article').run().then((articles) => {
        articles = articles.map((article) => {
            return {
                alcohol   : article.alcohol,
                created_at: article.createdAt,
                updated_at: article.editedAt,
                deleted_at: article.isRemoved ? new Date(+(new Date()) - Math.floor(Math.random()*1000)) : null,
                active    : article.isRemoved ? null : 1,
                id        : article.id,
                name      : article.name,
                vat       : article.vat,
                stock     : article.stock
            };
        });

        return chunkify(knex('articles'), articles);
    });
}

function copyCategories() {
    return r.table('Category').run().then((categories) => {
        categories = categories.map((category) => {
            return {
                created_at: category.createdAt,
                updated_at: category.editedAt,
                deleted_at: category.isRemoved ? new Date(+(new Date()) - Math.floor(Math.random()*1000)) : null,
                active    : category.isRemoved ? null : 1,
                id        : category.id,
                name      : category.name,
                priority  : category.priority
            };
        });

        return chunkify(knex('categories'), categories);
    });
}

function copyDevices() {
    return r.table('Device').run().then((devices) => {
        devices = devices.map((device) => {
            return {
                created_at      : device.createdAt,
                updated_at      : device.editedAt,
                deleted_at      : device.isRemoved ? new Date(+(new Date()) - Math.floor(Math.random()*1000)) : null,
                active          : device.isRemoved ? null : 1,
                id              : device.id,
                name            : device.name,
                fingerprint     : device.fingerprint,
                doubleValidation: device.doubleValidation,
                alcohol         : device.alcohol,
                showPicture     : device.showPicture,
                defaultGroup_id : device.DefaultGroup_id || null
            };
        });

        return chunkify(knex('devices'), devices);
    });
}

function copyWikets() {
    return r.table('DevicePoint').run().then((devicePoints) => {
        const wikets = devicePoints.map((devicePoint) => {
            return {
                created_at: devicePoint.createdAt,
                updated_at: devicePoint.editedAt,
                deleted_at: devicePoint.isRemoved ? new Date(+(new Date()) - Math.floor(Math.random()*1000)) : null,
                active    : devicePoint.isRemoved ? null : 1,
                id        : uuid.v4(),
                device_id : devicePoint.Device,
                point_id  : devicePoint.Point,
                period_id : devicePoint.Period_id
            };
        });

        return chunkify(knex('wikets'), wikets);
    });
}

function copyEvents() {
    return r.table('Event').run().then((events) => {
        events = events.map((event) => {
            return {
                created_at         : event.createdAt,
                updated_at         : event.editedAt,
                deleted_at         : event.isRemoved ? new Date(+(new Date()) - Math.floor(Math.random()*1000)) : null,
                active             : event.isRemoved ? null : 1,
                id                 : event.id,
                name               : event.name,
                minReload          : event.config.minReload,
                maxPerAccount      : event.config.maxPerAccount,
                maxAlcohol         : event.config.maxAlcohol,
                useGroups          : event.config.hasGroups,
                useFundations      : event.config.hasFundations,
                usePeriods         : event.config.hasPeriods,
                defaultGroup_id    : event.DefaultGroup_id || null,
                defaultFundation_id: event.DefaultFundation_id || null,
                defaultPeriod_id   : event.DefaultPeriod_id || null
            };
        });

        return chunkify(knex('events'), events);
    });
}

function copyFundations() {
    return r.table('Fundation').run().then((fundations) => {
        fundations = fundations.map((fundation) => {
            return {
                created_at: fundation.createdAt,
                updated_at: fundation.editedAt,
                deleted_at: fundation.isRemoved ? new Date(+(new Date()) - Math.floor(Math.random()*1000)) : null,
                active    : fundation.isRemoved ? null : 1,
                id        : fundation.id,
                name      : fundation.name
            };
        });

        return chunkify(knex('fundations'), fundations);
    });
}

function copyGroups() {
    return r.table('Group').run().then((groups) => {
        groups = groups.map((group) => {
            return {
                created_at: group.createdAt,
                updated_at: group.editedAt,
                deleted_at: group.isRemoved ? new Date(+(new Date()) - Math.floor(Math.random()*1000)) : null,
                active    : group.isRemoved ? null : 1,
                id        : group.id,
                name      : group.name
            };
        });

        return chunkify(knex('groups'), groups);
    });
}

function copyMemberships() {
    return r.table('GroupUser').run().then((groupUsers) => {
        const memberships = groupUsers.map((groupUser) => {
            return {
                created_at: groupUser.createdAt,
                updated_at: groupUser.editedAt,
                deleted_at: groupUser.isRemoved ? new Date(+(new Date()) - Math.floor(Math.random()*1000)) : null,
                active    : groupUser.isRemoved ? null : 1,
                id        : uuid.v4(),
                user_id   : groupUser.User,
                group_id  : groupUser.Group,
                period_id : groupUser.Period_id
            };
        });

        return chunkify(knex('memberships'), memberships);
    });
}

function copyMeansoflogins() {
    const predicate = r.row('type').eq('etuId')
                    .or(r.row('type').eq('etuMail'))
                    .or(r.row('type').eq('etuNumber'))
                    .and(r.row('data').ne(null))
                    .and(r.row('data').ne('null'));

    return r.table('MeanOfLogin').filter(predicate).run().then((meansOfLogin) => {
        meansOfLogin = meansOfLogin.map((meanOfLogin) => {
            return {
                created_at: meanOfLogin.createdAt,
                updated_at: meanOfLogin.editedAt,
                deleted_at: meanOfLogin.isRemoved ? new Date(+(new Date()) - Math.floor(Math.random()*1000)) : null,
                active    : meanOfLogin.isRemoved ? null : 1,
                id        : meanOfLogin.id,
                user_id   : meanOfLogin.User_id,
                blocked   : meanOfLogin.blocked,
                data      : String(meanOfLogin.data),
                type      : meanOfLogin.type
            };
        });

        return chunkify(knex('meansoflogin'), meansOfLogin).catch(console.log);
    });
}

function copyPeriods() {
    return r.table('Period').run().then((periods) => {
        periods = periods.map((period) => {
            return {
                created_at: period.createdAt,
                updated_at: period.editedAt,
                deleted_at: period.isRemoved ? new Date(+(new Date()) - Math.floor(Math.random()*1000)) : null,
                active    : period.isRemoved ? null : 1,
                id        : period.id,
                name      : period.name,
                start     : period.start,
                end       : period.end,
                event_id  : period.Event_id
            };
        });

        return chunkify(knex('periods'), periods);
    });
}

function copyPoints() {
    return r.table('Point').run().then((points) => {
        points = points.map((point) => {
            return {
                created_at: point.createdAt,
                updated_at: point.editedAt,
                deleted_at: point.isRemoved ? new Date(+(new Date()) - Math.floor(Math.random()*1000)) : null,
                active    : point.isRemoved ? null : 1,
                id        : point.id,
                name      : point.name
            };
        });

        return chunkify(knex('points'), points);
    });
}

function copyPrices() {
    return r.table('Price').run().then((prices) => {
        prices = prices.map((price) => {
            return {
                created_at  : price.createdAt,
                updated_at  : price.editedAt,
                deleted_at  : price.isRemoved ? new Date(+(new Date()) - Math.floor(Math.random()*1000)) : null,
                active      : price.isRemoved ? null : 1,
                id          : price.id,
                amount      : price.amount,
                article_id  : null,
                fundation_id: price.Fundation_id,
                group_id    : price.Group_id,
                period_id   : price.Period_id,
                point_id    : price.Point_id,
                promotion_id: null
            };
        });

        return chunkify(knex('prices'), prices);
    });
}

function copyPromotions() {
    return r.table('Promotion').run().then((promotions) => {
        promotions = promotions.map((promotion) => {
            return {
                created_at: promotion.createdAt,
                updated_at: promotion.editedAt,
                deleted_at: promotion.isRemoved ? new Date(+(new Date()) - Math.floor(Math.random()*1000)) : null,
                active    : promotion.isRemoved ? null : 1,
                id        : promotion.id,
                name      : promotion.name
            };
        });

        return chunkify(knex('promotions'), promotions);
    });
}

function copyPurchases() {
    return r.table('Purchase').run().then((purchases) => {
        purchases = purchases.map((purchase) => {
            return {
                created_at   : purchase.createdAt,
                updated_at   : purchase.editedAt,
                deleted_at   : purchase.isRemoved ? new Date(+(new Date()) - Math.floor(Math.random()*1000)) : null,
                active       : purchase.isRemoved ? null : 1,
                id           : purchase.id,
                vat          : purchase.vat,
                alcohol      : purchase.alcohol,
                price_id     : purchase.Price_id,
                point_id     : purchase.Point_id,
                promotion_id : purchase.Promotion_id,
                buyer_id     : purchase.Buyer_id,
                seller_id    : purchase.Seller_id
            };
        });

        return chunkify(knex('purchases'), purchases);
    });
}

function copyRefunds() {
    return r.table('Refund').run().then((refunds) => {
        refunds = refunds.map((refund) => {
            return {
                created_at: refund.createdAt,
                updated_at: refund.editedAt,
                deleted_at: refund.isRemoved ? new Date(+(new Date()) - Math.floor(Math.random()*1000)) : null,
                active    : refund.isRemoved ? null : 1,
                id        : refund.id,
                amount    : refund.amount,
                type      : refund.type,
                trace     : refund.trace,
                buyer_id  : refund.Buyer_id,
                seller_id : refund.Seller_id
            };
        });

        return chunkify(knex('refunds'), refunds);
    });
}

function copyReloads() {
    return r.table('Reload').run().then((reloads) => {
        reloads = reloads.map((reload) => {
            return {
                created_at: reload.createdAt,
                updated_at: reload.editedAt,
                deleted_at: reload.isRemoved ? new Date(+(new Date()) - Math.floor(Math.random()*1000)) : null,
                active    : reload.isRemoved ? null : 1,
                id        : reload.id,
                credit    : reload.credit,
                type      : reload.type,
                trace     : reload.trace,
                point_id  : reload.Point_id,
                buyer_id  : reload.Buyer_id,
                seller_id : reload.Seller_id
            };
        });

        return chunkify(knex('reloads'), reloads);
    });
}

function copyRights() {
    return r.table('Right').run().then((rights) => {
        rights = rights.map((right) => {
            return {
                created_at: right.createdAt,
                updated_at: right.editedAt,
                deleted_at: right.isRemoved ? new Date(+(new Date()) - Math.floor(Math.random()*1000)) : null,
                active    : right.isRemoved ? null : 1,
                id        : right.id,
                name      : right.name,
                point_id  : right.Point_id,
                period_id : right.Period_id,
                user_id   : null
            };
        });

        return chunkify(knex('rights'), rights);
    });
}

function copySets() {
    return r.table('Set').run().then((sets) => {
        sets = sets.map((set) => {
            return {
                created_at: set.createdAt,
                updated_at: set.editedAt,
                deleted_at: set.isRemoved ? new Date(+(new Date()) - Math.floor(Math.random()*1000)) : null,
                active    : set.isRemoved ? null : 1,
                id        : set.id
            };
        });

        return chunkify(knex('sets'), sets);
    });
}

function copyTransfers() {
    return r.table('Transfer').run().then((transfers) => {
        transfers = transfers.map((transfer) => {
            return {
                created_at : transfer.createdAt,
                updated_at : transfer.editedAt,
                deleted_at : transfer.isRemoved ? new Date(+(new Date()) - Math.floor(Math.random()*1000)) : null,
                active     : transfer.isRemoved ? null : 1,
                id         : transfer.id,
                amount     : transfer.amount,
                sender_id  : transfer.Sender_id,
                reciever_id: transfer.Reciever_id
            };
        });

        return chunkify(knex('transfers'), transfers);
    });
}

function copyUsers() {
    return r.table('User').run().then((users) => {
        users = users.map((user) => {
            if (!user.mail) {
                user.mail = defaultMail(user)
            }

            return {
                created_at : user.createdAt,
                updated_at : user.editedAt,
                deleted_at : user.isRemoved ? new Date(+(new Date()) - Math.floor(Math.random()*1000)) : null,
                active     : user.isRemoved ? null : 1,
                id         : user.id,
                firstname  : user.firstname,
                lastname   : user.lastname,
                nickname   : user.nickname,
                pin        : user.pin,
                password   : user.password,
                recoverKey : user.recoverKey,
                mail       : user.mail,
                credit     : user.credit,
                isTemporary: user.isTemporary
            };
        });

        return chunkify(knex('users'), users);
    });
}

function copyArticleCategories() {
    return r.table('Article_Category').run().then((articleCategories) => {
        articleCategories = articleCategories.map((articleCategory) => {
            return {
                created_at: new Date(+(new Date()) - Math.floor(Math.random()*1000)),
                updated_at: new Date(+(new Date()) - Math.floor(Math.random()*1000)),
                deleted_at: null,
                active    : 1,
                article_id: articleCategory.Article,
                category_id: articleCategory.Category
            }
        });

        return chunkify(knex('articles_categories'), articleCategories);
    });
}

function copyArticlePrices() {
    return r.table('Article_Price').run().then((articlePrices) => {
        articlePrices = articlePrices.map((articlePrice) => {
            return knex('prices')
                .where('id', articlePrice.Price)
                .update({ article_id: articlePrice.Article })
        });

        return Promise.all(articlePrices);
    });
}

function copyArticlePromotions() {
    return r.table('Article_Promotion').run().then((articlePromotions) => {
        articlePromotions = articlePromotions.map((articlePromotion) => {
            const id = uuid.v4();

            return knex('sets').insert({
                    id,
                    created_at: new Date(+(new Date()) - Math.floor(Math.random()*1000)),
                    updated_at: new Date(+(new Date()) - Math.floor(Math.random()*1000)),
                    deleted_at: null,
                    active    : 1
                })
                .then(() => knex('articles_sets').insert({
                    created_at: new Date(+(new Date()) - Math.floor(Math.random()*1000)),
                    updated_at: new Date(+(new Date()) - Math.floor(Math.random()*1000)),
                    deleted_at: null,
                    active    : 1,
                    article_id: articlePromotion.Article,
                    set_id: id
                }))
                .then(() => knex('promotions_sets').insert({
                    created_at  : new Date(+(new Date()) - Math.floor(Math.random()*1000)),
                    updated_at  : new Date(+(new Date()) - Math.floor(Math.random()*1000)),
                    deleted_at  : null,
                    active      : 1,
                    promotion_id: articlePromotion.Promotion,
                    set_id      : id
                }));
        });

        return Promise.all(articlePromotions);
    });
}

function copyArticlePurchases() {
    return r.table('Article_Purchase').group('Purchase', 'Article').run().then((articlePurchases) => {

        articlePurchases = articlePurchases.map((articlePurchase) => {
            return {
                created_at : new Date(+(new Date()) - Math.floor(Math.random()*1000)),
                updated_at : new Date(+(new Date()) - Math.floor(Math.random()*1000)),
                deleted_at : null,
                active     : 1,
                article_id : articlePurchase.reduction[0].Article,
                purchase_id: articlePurchase.reduction[0].Purchase,
                count      : articlePurchase.reduction.length
            }
        });

        return chunkify(knex('articles_purchases'), articlePurchases);
    });
}

function copyArticleSets() {
    return r.table('Article_Set').run().then((articleSets) => {
        articleSets = articleSets.map((articleSet) => {
            return {
                created_at: new Date(+(new Date()) - Math.floor(Math.random()*1000)),
                updated_at: new Date(+(new Date()) - Math.floor(Math.random()*1000)),
                deleted_at: null,
                active    : 1,
                article_id: articleSet.Article,
                set_id    : articleSet.Set
            }
        });

        return chunkify(knex('articles_sets'), articleSets);
    });
}

function copyCategoryPoints() {
    return r.table('Category_Point').run().then((categoryPoints) => {
        categoryPoints = categoryPoints.map((categoryPoint) => {
            return {
                created_at : new Date(+(new Date()) - Math.floor(Math.random()*1000)),
                updated_at : new Date(+(new Date()) - Math.floor(Math.random()*1000)),
                deleted_at : null,
                active     : 1,
                category_id: categoryPoint.Category,
                point_id   : categoryPoint.Point
            }
        });

        return chunkify(knex('categories_points'), categoryPoints);
    });
}

function copyPromotionPrices() {
    return r.table('Price_Promotion').run().then((promotionPrices) => {
        promotionPrices = promotionPrices.map((promotionPrice) => {
            return knex('prices')
                .where('id', promotionPrice.Price)
                .update({ promotion_id: promotionPrice.Promotion })
        });

        return Promise.all(promotionPrices);
    });
}

function copyPromotionSets() {
    return r.table('Promotion_Set').run().then((promotionSets) => {
        promotionSets = promotionSets.map((promotionSet) => {
            return {
                created_at  : new Date(+(new Date()) - Math.floor(Math.random()*1000)),
                updated_at  : new Date(+(new Date()) - Math.floor(Math.random()*1000)),
                deleted_at  : null,
                active      : 1,
                promotion_id: promotionSet.Promotion,
                set_id      : promotionSet.Set
            }
        });

        return chunkify(knex('promotions_sets'), promotionSets);
    });
}

function copyUserRights() {
    return r.table('Right_User').run().then((userRights) => {
        userRights = userRights.map((userRight) => {
            return knex('rights')
                .where('id', userRight.Right)
                .update({ user_id: userRight.User })
        });

        return Promise.all(userRights);
    });
}
