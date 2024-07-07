import type { Schema, Attribute } from '@strapi/strapi';

export interface AdminPermission extends Schema.CollectionType {
  collectionName: 'admin_permissions';
  info: {
    name: 'Permission';
    description: '';
    singularName: 'permission';
    pluralName: 'permissions';
    displayName: 'Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    actionParameters: Attribute.JSON & Attribute.DefaultTo<{}>;
    subject: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    properties: Attribute.JSON & Attribute.DefaultTo<{}>;
    conditions: Attribute.JSON & Attribute.DefaultTo<[]>;
    role: Attribute.Relation<'admin::permission', 'manyToOne', 'admin::role'>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminUser extends Schema.CollectionType {
  collectionName: 'admin_users';
  info: {
    name: 'User';
    description: '';
    singularName: 'user';
    pluralName: 'users';
    displayName: 'User';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    firstname: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    lastname: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    username: Attribute.String;
    email: Attribute.Email &
      Attribute.Required &
      Attribute.Private &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    password: Attribute.Password &
      Attribute.Private &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    resetPasswordToken: Attribute.String & Attribute.Private;
    registrationToken: Attribute.String & Attribute.Private;
    isActive: Attribute.Boolean &
      Attribute.Private &
      Attribute.DefaultTo<false>;
    roles: Attribute.Relation<'admin::user', 'manyToMany', 'admin::role'> &
      Attribute.Private;
    blocked: Attribute.Boolean & Attribute.Private & Attribute.DefaultTo<false>;
    preferedLanguage: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'admin::user', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    updatedBy: Attribute.Relation<'admin::user', 'oneToOne', 'admin::user'> &
      Attribute.Private;
  };
}

export interface AdminRole extends Schema.CollectionType {
  collectionName: 'admin_roles';
  info: {
    name: 'Role';
    description: '';
    singularName: 'role';
    pluralName: 'roles';
    displayName: 'Role';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    code: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    description: Attribute.String;
    users: Attribute.Relation<'admin::role', 'manyToMany', 'admin::user'>;
    permissions: Attribute.Relation<
      'admin::role',
      'oneToMany',
      'admin::permission'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'admin::role', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    updatedBy: Attribute.Relation<'admin::role', 'oneToOne', 'admin::user'> &
      Attribute.Private;
  };
}

export interface AdminApiToken extends Schema.CollectionType {
  collectionName: 'strapi_api_tokens';
  info: {
    name: 'Api Token';
    singularName: 'api-token';
    pluralName: 'api-tokens';
    displayName: 'Api Token';
    description: '';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    description: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }> &
      Attribute.DefaultTo<''>;
    type: Attribute.Enumeration<['read-only', 'full-access', 'custom']> &
      Attribute.Required &
      Attribute.DefaultTo<'read-only'>;
    accessKey: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    lastUsedAt: Attribute.DateTime;
    permissions: Attribute.Relation<
      'admin::api-token',
      'oneToMany',
      'admin::api-token-permission'
    >;
    expiresAt: Attribute.DateTime;
    lifespan: Attribute.BigInteger;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::api-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::api-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminApiTokenPermission extends Schema.CollectionType {
  collectionName: 'strapi_api_token_permissions';
  info: {
    name: 'API Token Permission';
    description: '';
    singularName: 'api-token-permission';
    pluralName: 'api-token-permissions';
    displayName: 'API Token Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    token: Attribute.Relation<
      'admin::api-token-permission',
      'manyToOne',
      'admin::api-token'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::api-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::api-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminTransferToken extends Schema.CollectionType {
  collectionName: 'strapi_transfer_tokens';
  info: {
    name: 'Transfer Token';
    singularName: 'transfer-token';
    pluralName: 'transfer-tokens';
    displayName: 'Transfer Token';
    description: '';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    description: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }> &
      Attribute.DefaultTo<''>;
    accessKey: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    lastUsedAt: Attribute.DateTime;
    permissions: Attribute.Relation<
      'admin::transfer-token',
      'oneToMany',
      'admin::transfer-token-permission'
    >;
    expiresAt: Attribute.DateTime;
    lifespan: Attribute.BigInteger;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::transfer-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::transfer-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminTransferTokenPermission extends Schema.CollectionType {
  collectionName: 'strapi_transfer_token_permissions';
  info: {
    name: 'Transfer Token Permission';
    description: '';
    singularName: 'transfer-token-permission';
    pluralName: 'transfer-token-permissions';
    displayName: 'Transfer Token Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    token: Attribute.Relation<
      'admin::transfer-token-permission',
      'manyToOne',
      'admin::transfer-token'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::transfer-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::transfer-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUploadFile extends Schema.CollectionType {
  collectionName: 'files';
  info: {
    singularName: 'file';
    pluralName: 'files';
    displayName: 'File';
    description: '';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String & Attribute.Required;
    alternativeText: Attribute.String;
    caption: Attribute.String;
    width: Attribute.Integer;
    height: Attribute.Integer;
    formats: Attribute.JSON;
    hash: Attribute.String & Attribute.Required;
    ext: Attribute.String;
    mime: Attribute.String & Attribute.Required;
    size: Attribute.Decimal & Attribute.Required;
    url: Attribute.String & Attribute.Required;
    previewUrl: Attribute.String;
    provider: Attribute.String & Attribute.Required;
    provider_metadata: Attribute.JSON;
    related: Attribute.Relation<'plugin::upload.file', 'morphToMany'>;
    folder: Attribute.Relation<
      'plugin::upload.file',
      'manyToOne',
      'plugin::upload.folder'
    > &
      Attribute.Private;
    folderPath: Attribute.String &
      Attribute.Required &
      Attribute.Private &
      Attribute.SetMinMax<
        {
          min: 1;
        },
        number
      >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::upload.file',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::upload.file',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUploadFolder extends Schema.CollectionType {
  collectionName: 'upload_folders';
  info: {
    singularName: 'folder';
    pluralName: 'folders';
    displayName: 'Folder';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMax<
        {
          min: 1;
        },
        number
      >;
    pathId: Attribute.Integer & Attribute.Required & Attribute.Unique;
    parent: Attribute.Relation<
      'plugin::upload.folder',
      'manyToOne',
      'plugin::upload.folder'
    >;
    children: Attribute.Relation<
      'plugin::upload.folder',
      'oneToMany',
      'plugin::upload.folder'
    >;
    files: Attribute.Relation<
      'plugin::upload.folder',
      'oneToMany',
      'plugin::upload.file'
    >;
    path: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMax<
        {
          min: 1;
        },
        number
      >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::upload.folder',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::upload.folder',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginContentReleasesRelease extends Schema.CollectionType {
  collectionName: 'strapi_releases';
  info: {
    singularName: 'release';
    pluralName: 'releases';
    displayName: 'Release';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String & Attribute.Required;
    releasedAt: Attribute.DateTime;
    scheduledAt: Attribute.DateTime;
    timezone: Attribute.String;
    status: Attribute.Enumeration<
      ['ready', 'blocked', 'failed', 'done', 'empty']
    > &
      Attribute.Required;
    actions: Attribute.Relation<
      'plugin::content-releases.release',
      'oneToMany',
      'plugin::content-releases.release-action'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::content-releases.release',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::content-releases.release',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginContentReleasesReleaseAction
  extends Schema.CollectionType {
  collectionName: 'strapi_release_actions';
  info: {
    singularName: 'release-action';
    pluralName: 'release-actions';
    displayName: 'Release Action';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    type: Attribute.Enumeration<['publish', 'unpublish']> & Attribute.Required;
    entry: Attribute.Relation<
      'plugin::content-releases.release-action',
      'morphToOne'
    >;
    contentType: Attribute.String & Attribute.Required;
    locale: Attribute.String;
    release: Attribute.Relation<
      'plugin::content-releases.release-action',
      'manyToOne',
      'plugin::content-releases.release'
    >;
    isEntryValid: Attribute.Boolean;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::content-releases.release-action',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::content-releases.release-action',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUsersPermissionsPermission
  extends Schema.CollectionType {
  collectionName: 'up_permissions';
  info: {
    name: 'permission';
    description: '';
    singularName: 'permission';
    pluralName: 'permissions';
    displayName: 'Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String & Attribute.Required;
    role: Attribute.Relation<
      'plugin::users-permissions.permission',
      'manyToOne',
      'plugin::users-permissions.role'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::users-permissions.permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::users-permissions.permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUsersPermissionsRole extends Schema.CollectionType {
  collectionName: 'up_roles';
  info: {
    name: 'role';
    description: '';
    singularName: 'role';
    pluralName: 'roles';
    displayName: 'Role';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 3;
      }>;
    description: Attribute.String;
    type: Attribute.String & Attribute.Unique;
    permissions: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToMany',
      'plugin::users-permissions.permission'
    >;
    users: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToMany',
      'plugin::users-permissions.user'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUsersPermissionsUser extends Schema.CollectionType {
  collectionName: 'up_users';
  info: {
    name: 'user';
    description: '';
    singularName: 'user';
    pluralName: 'users';
    displayName: 'User';
  };
  options: {
    draftAndPublish: false;
    timestamps: true;
  };
  attributes: {
    username: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 3;
      }>;
    email: Attribute.Email &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    provider: Attribute.String;
    password: Attribute.Password &
      Attribute.Private &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    resetPasswordToken: Attribute.String & Attribute.Private;
    confirmationToken: Attribute.String & Attribute.Private;
    confirmed: Attribute.Boolean & Attribute.DefaultTo<false>;
    blocked: Attribute.Boolean & Attribute.DefaultTo<false>;
    role: Attribute.Relation<
      'plugin::users-permissions.user',
      'manyToOne',
      'plugin::users-permissions.role'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::users-permissions.user',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::users-permissions.user',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginI18NLocale extends Schema.CollectionType {
  collectionName: 'i18n_locale';
  info: {
    singularName: 'locale';
    pluralName: 'locales';
    collectionName: 'locales';
    displayName: 'Locale';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.SetMinMax<
        {
          min: 1;
          max: 50;
        },
        number
      >;
    code: Attribute.String & Attribute.Unique;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::i18n.locale',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::i18n.locale',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiAdaptationMeasureAdaptationMeasure
  extends Schema.CollectionType {
  collectionName: 'adaptation_measures';
  info: {
    singularName: 'adaptation-measure';
    pluralName: 'adaptation-measures';
    displayName: 'AdaptationMeasure';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    heading: Attribute.String;
    description: Attribute.Text;
    climate_adaptation: Attribute.Relation<
      'api::adaptation-measure.adaptation-measure',
      'manyToOne',
      'api::climate-adaptation.climate-adaptation'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::adaptation-measure.adaptation-measure',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::adaptation-measure.adaptation-measure',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiAdaptationUnsealingAdaptationUnsealing
  extends Schema.CollectionType {
  collectionName: 'adaptation_unsealings';
  info: {
    singularName: 'adaptation-unsealing';
    pluralName: 'adaptation-unsealings';
    displayName: 'AdaptationHTW';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    heading: Attribute.String;
    description: Attribute.Text;
    image: Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    climate_adaptation: Attribute.Relation<
      'api::adaptation-unsealing.adaptation-unsealing',
      'manyToOne',
      'api::climate-adaptation.climate-adaptation'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::adaptation-unsealing.adaptation-unsealing',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::adaptation-unsealing.adaptation-unsealing',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiBioDiversityBioDiversity extends Schema.CollectionType {
  collectionName: 'bio_diversities';
  info: {
    singularName: 'bio-diversity';
    pluralName: 'bio-diversities';
    displayName: 'Main Page: BioDiversity';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    bannerTitle: Attribute.String;
    headerImage: Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    category: Attribute.String;
    heading: Attribute.String;
    description: Attribute.Text;
    image_cards: Attribute.Relation<
      'api::bio-diversity.bio-diversity',
      'oneToMany',
      'api::image-card.image-card'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::bio-diversity.bio-diversity',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::bio-diversity.bio-diversity',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiCallToActionCallToAction extends Schema.CollectionType {
  collectionName: 'call_to_actions';
  info: {
    singularName: 'call-to-action';
    pluralName: 'call-to-actions';
    displayName: 'CallToAction';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    heading: Attribute.String;
    description: Attribute.Text;
    page: Attribute.String;
    main_page_home: Attribute.Relation<
      'api::call-to-action.call-to-action',
      'manyToOne',
      'api::home.home'
    >;
    main_page_climate_change: Attribute.Relation<
      'api::call-to-action.call-to-action',
      'manyToOne',
      'api::climate-change.climate-change'
    >;
    main_page_climate_adaptation: Attribute.Relation<
      'api::call-to-action.call-to-action',
      'manyToOne',
      'api::climate-adaptation.climate-adaptation'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::call-to-action.call-to-action',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::call-to-action.call-to-action',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiCampaignCampaign extends Schema.CollectionType {
  collectionName: 'campaigns';
  info: {
    singularName: 'campaign';
    pluralName: 'campaigns';
    displayName: 'CampaignPast';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    image: Attribute.Media<'images' | 'files' | 'videos' | 'audios'> &
      Attribute.Required;
    title: Attribute.String & Attribute.Required;
    campaign_categories: Attribute.Relation<
      'api::campaign.campaign',
      'manyToMany',
      'api::category.category'
    >;
    main_page_campus_campaign: Attribute.Relation<
      'api::campaign.campaign',
      'manyToOne',
      'api::campus-campaign.campus-campaign'
    >;
    description: Attribute.Text;
    location: Attribute.String;
    tips: Attribute.Relation<
      'api::campaign.campaign',
      'oneToMany',
      'api::tip.tip'
    >;
    shortDescription: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::campaign.campaign',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::campaign.campaign',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiCampusCampaignCampusCampaign extends Schema.CollectionType {
  collectionName: 'campus_campaigns';
  info: {
    singularName: 'campus-campaign';
    pluralName: 'campus-campaigns';
    displayName: 'Main Page: CampusCampaign';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    bannerTitle: Attribute.String & Attribute.Required;
    headerImage: Attribute.Media<'images' | 'files' | 'videos' | 'audios'> &
      Attribute.Required;
    category: Attribute.String & Attribute.Required;
    heading: Attribute.String & Attribute.Required;
    description: Attribute.Text & Attribute.Required;
    campaigns: Attribute.Relation<
      'api::campus-campaign.campus-campaign',
      'oneToMany',
      'api::campaign.campaign'
    >;
    current_campaigns: Attribute.Relation<
      'api::campus-campaign.campus-campaign',
      'oneToMany',
      'api::current-campaign.current-campaign'
    >;
    filterText: Attribute.String;
    category2: Attribute.String;
    heading2: Attribute.String;
    description2: Attribute.Text;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::campus-campaign.campus-campaign',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::campus-campaign.campus-campaign',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiCategoryCategory extends Schema.CollectionType {
  collectionName: 'categories';
  info: {
    singularName: 'category';
    pluralName: 'categories';
    displayName: 'CampaignCategory';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    value: Attribute.String & Attribute.Required;
    campaigns: Attribute.Relation<
      'api::category.category',
      'manyToMany',
      'api::campaign.campaign'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::category.category',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::category.category',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiClimateAdaptationClimateAdaptation
  extends Schema.CollectionType {
  collectionName: 'climate_adaptations';
  info: {
    singularName: 'climate-adaptation';
    pluralName: 'climate-adaptations';
    displayName: 'Main Page: ClimateAdaptation';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    bannerTitle: Attribute.String;
    headerImage: Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    category: Attribute.String;
    heading: Attribute.String;
    description: Attribute.Text;
    videoTitle: Attribute.String;
    videoDescription: Attribute.Text;
    grid_items: Attribute.Relation<
      'api::climate-adaptation.climate-adaptation',
      'oneToMany',
      'api::grid-item.grid-item'
    >;
    heading_2: Attribute.String;
    secondBannerTitle: Attribute.String;
    secondBannerDescription: Attribute.Text;
    secondBannerImage: Attribute.Media<
      'images' | 'files' | 'videos' | 'audios'
    >;
    adaptation_measures: Attribute.Relation<
      'api::climate-adaptation.climate-adaptation',
      'oneToMany',
      'api::adaptation-measure.adaptation-measure'
    >;
    map_slider_items: Attribute.Relation<
      'api::climate-adaptation.climate-adaptation',
      'oneToMany',
      'api::map-slider-item.map-slider-item'
    >;
    thirdBannerTitle: Attribute.String;
    thirdBannerDescription: Attribute.Text;
    thirdBannerCategory: Attribute.String;
    adaptation_unsealings: Attribute.Relation<
      'api::climate-adaptation.climate-adaptation',
      'oneToMany',
      'api::adaptation-unsealing.adaptation-unsealing'
    >;
    fourthBannerTitle: Attribute.String;
    fourthBannerDescription: Attribute.Text;
    fourthBannerImage: Attribute.Media<
      'images' | 'files' | 'videos' | 'audios'
    >;
    category_2: Attribute.String;
    description_2: Attribute.Text;
    call_to_actions: Attribute.Relation<
      'api::climate-adaptation.climate-adaptation',
      'oneToMany',
      'api::call-to-action.call-to-action'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::climate-adaptation.climate-adaptation',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::climate-adaptation.climate-adaptation',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiClimateChangeClimateChange extends Schema.CollectionType {
  collectionName: 'climate_changes';
  info: {
    singularName: 'climate-change';
    pluralName: 'climate-changes';
    displayName: 'Main Page: ClimateChange';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    bannerTitle: Attribute.String;
    headerImage: Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    heading: Attribute.String;
    description: Attribute.Text;
    secondBannerImage: Attribute.Media<
      'images' | 'files' | 'videos' | 'audios'
    >;
    secondBannerTitle: Attribute.String;
    category: Attribute.String;
    secondBannerDescription: Attribute.Text;
    consequences: Attribute.Relation<
      'api::climate-change.climate-change',
      'oneToMany',
      'api::consequence.consequence'
    >;
    slider_items: Attribute.Relation<
      'api::climate-change.climate-change',
      'oneToMany',
      'api::slider-item.slider-item'
    >;
    category_2: Attribute.String;
    heading_2: Attribute.String;
    description_2: Attribute.Text;
    consequence_slider_items: Attribute.Relation<
      'api::climate-change.climate-change',
      'oneToMany',
      'api::consequence-slider-item.consequence-slider-item'
    >;
    social_consequences: Attribute.Relation<
      'api::climate-change.climate-change',
      'oneToMany',
      'api::social-consequence.social-consequence'
    >;
    economic_consequences: Attribute.Relation<
      'api::climate-change.climate-change',
      'oneToMany',
      'api::economic-consequence.economic-consequence'
    >;
    category_3: Attribute.String;
    heading_3: Attribute.String;
    description_3: Attribute.Text;
    thirdBannerImage: Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    sliderHeading: Attribute.String;
    sliderDescription: Attribute.Text;
    call_to_actions: Attribute.Relation<
      'api::climate-change.climate-change',
      'oneToMany',
      'api::call-to-action.call-to-action'
    >;
    image_cards: Attribute.Relation<
      'api::climate-change.climate-change',
      'oneToMany',
      'api::image-card.image-card'
    >;
    quizCategory: Attribute.String;
    quizHeading: Attribute.String;
    quizDescription: Attribute.Text;
    quizSource: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::climate-change.climate-change',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::climate-change.climate-change',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiConsequenceConsequence extends Schema.CollectionType {
  collectionName: 'consequences';
  info: {
    singularName: 'consequence';
    pluralName: 'consequences';
    displayName: 'ConsequenceIntroduction';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    heading: Attribute.String;
    description: Attribute.Text;
    climate_change: Attribute.Relation<
      'api::consequence.consequence',
      'manyToOne',
      'api::climate-change.climate-change'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::consequence.consequence',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::consequence.consequence',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiConsequenceSliderItemConsequenceSliderItem
  extends Schema.CollectionType {
  collectionName: 'consequence_slider_items';
  info: {
    singularName: 'consequence-slider-item';
    pluralName: 'consequence-slider-items';
    displayName: 'ConsequenceNatural';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    heading: Attribute.String;
    description: Attribute.Text;
    image: Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    climate_change: Attribute.Relation<
      'api::consequence-slider-item.consequence-slider-item',
      'manyToOne',
      'api::climate-change.climate-change'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::consequence-slider-item.consequence-slider-item',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::consequence-slider-item.consequence-slider-item',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiCurrentCampaignCurrentCampaign
  extends Schema.CollectionType {
  collectionName: 'current_campaigns';
  info: {
    singularName: 'current-campaign';
    pluralName: 'current-campaigns';
    displayName: 'CampaignCurrent';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    image: Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    title: Attribute.String;
    datetime: Attribute.DateTime;
    location: Attribute.String;
    description: Attribute.String;
    main_page_campus_campaign: Attribute.Relation<
      'api::current-campaign.current-campaign',
      'manyToOne',
      'api::campus-campaign.campus-campaign'
    >;
    link: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::current-campaign.current-campaign',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::current-campaign.current-campaign',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiEconomicConsequenceEconomicConsequence
  extends Schema.CollectionType {
  collectionName: 'economic_consequences';
  info: {
    singularName: 'economic-consequence';
    pluralName: 'economic-consequences';
    displayName: 'ConsequenceEconomic';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    heading: Attribute.String;
    description: Attribute.Text;
    image: Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    climate_change: Attribute.Relation<
      'api::economic-consequence.economic-consequence',
      'manyToOne',
      'api::climate-change.climate-change'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::economic-consequence.economic-consequence',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::economic-consequence.economic-consequence',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiGridItemGridItem extends Schema.CollectionType {
  collectionName: 'grid_items';
  info: {
    singularName: 'grid-item';
    pluralName: 'grid-items';
    displayName: 'ClimateAdaptationGridItem';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    title: Attribute.String;
    description: Attribute.Text;
    image: Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    climate_adaptation: Attribute.Relation<
      'api::grid-item.grid-item',
      'manyToOne',
      'api::climate-adaptation.climate-adaptation'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::grid-item.grid-item',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::grid-item.grid-item',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiHomeHome extends Schema.CollectionType {
  collectionName: 'homes';
  info: {
    singularName: 'home';
    pluralName: 'homes';
    displayName: 'Main Page: Home';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    headerTitle: Attribute.String;
    headerImage: Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    heading: Attribute.String;
    description: Attribute.Text;
    category: Attribute.String;
    bannerDescription: Attribute.Text;
    bannerImage: Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    climate_change_reasons: Attribute.Relation<
      'api::home.home',
      'oneToMany',
      'api::reason.reason'
    >;
    bannerTitle: Attribute.String;
    category_2: Attribute.String;
    heading_2: Attribute.String;
    description_2: Attribute.Text;
    secondBannerTitle: Attribute.String;
    secondBannerDescription: Attribute.Text;
    secondBannerImage: Attribute.Media<
      'images' | 'files' | 'videos' | 'audios'
    >;
    call_to_actions: Attribute.Relation<
      'api::home.home',
      'oneToMany',
      'api::call-to-action.call-to-action'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'api::home.home', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    updatedBy: Attribute.Relation<'api::home.home', 'oneToOne', 'admin::user'> &
      Attribute.Private;
  };
}

export interface ApiImageCardImageCard extends Schema.CollectionType {
  collectionName: 'image_cards';
  info: {
    singularName: 'image-card';
    pluralName: 'image-cards';
    displayName: 'ImageCard';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    image: Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    heading: Attribute.String;
    description: Attribute.Text;
    link: Attribute.String;
    main_page_climate_change: Attribute.Relation<
      'api::image-card.image-card',
      'manyToOne',
      'api::climate-change.climate-change'
    >;
    main_page_bio_diversity: Attribute.Relation<
      'api::image-card.image-card',
      'manyToOne',
      'api::bio-diversity.bio-diversity'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::image-card.image-card',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::image-card.image-card',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiMapSliderItemMapSliderItem extends Schema.CollectionType {
  collectionName: 'map_slider_items';
  info: {
    singularName: 'map-slider-item';
    pluralName: 'map-slider-items';
    displayName: 'MapSliderItem';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    heading: Attribute.String;
    description: Attribute.Text;
    climate_adaptation: Attribute.Relation<
      'api::map-slider-item.map-slider-item',
      'manyToOne',
      'api::climate-adaptation.climate-adaptation'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::map-slider-item.map-slider-item',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::map-slider-item.map-slider-item',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiPagePage extends Schema.CollectionType {
  collectionName: 'pages';
  info: {
    singularName: 'page';
    pluralName: 'pages';
    displayName: 'Page';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    title: Attribute.String;
    description: Attribute.Text;
    route: Attribute.String;
    image: Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    page_sections: Attribute.Relation<
      'api::page.page',
      'oneToMany',
      'api::page-section.page-section'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'api::page.page', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    updatedBy: Attribute.Relation<'api::page.page', 'oneToOne', 'admin::user'> &
      Attribute.Private;
  };
}

export interface ApiPageSectionPageSection extends Schema.CollectionType {
  collectionName: 'page_sections';
  info: {
    singularName: 'page-section';
    pluralName: 'page-sections';
    displayName: 'PageSection';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    menuName: Attribute.String;
    oneWordHashtag: Attribute.String;
    page: Attribute.Relation<
      'api::page-section.page-section',
      'manyToOne',
      'api::page.page'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::page-section.page-section',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::page-section.page-section',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiQuizQuestionQuizQuestion extends Schema.CollectionType {
  collectionName: 'quiz_questions';
  info: {
    singularName: 'quiz-question';
    pluralName: 'quiz-questions';
    displayName: 'ConsequencesQuizQuestion';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    question: Attribute.String;
    answer1: Attribute.String;
    answer2: Attribute.String;
    answer3: Attribute.String;
    answer4: Attribute.String;
    correctAnswer: Attribute.Integer;
    explanation: Attribute.Text;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::quiz-question.quiz-question',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::quiz-question.quiz-question',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiReasonReason extends Schema.CollectionType {
  collectionName: 'reasons';
  info: {
    singularName: 'reason';
    pluralName: 'reasons';
    displayName: 'ClimateChangeReason';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    heading: Attribute.String;
    description: Attribute.Text;
    home: Attribute.Relation<
      'api::reason.reason',
      'manyToOne',
      'api::home.home'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::reason.reason',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::reason.reason',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiSliderItemSliderItem extends Schema.CollectionType {
  collectionName: 'slider_items';
  info: {
    singularName: 'slider-item';
    pluralName: 'slider-items';
    displayName: 'ClimateChangeSliderItem';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    heading: Attribute.String;
    description: Attribute.Text;
    climate_change: Attribute.Relation<
      'api::slider-item.slider-item',
      'manyToOne',
      'api::climate-change.climate-change'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::slider-item.slider-item',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::slider-item.slider-item',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiSocialConsequenceSocialConsequence
  extends Schema.CollectionType {
  collectionName: 'social_consequences';
  info: {
    singularName: 'social-consequence';
    pluralName: 'social-consequences';
    displayName: 'ConsequenceSocial';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    heading: Attribute.String;
    description: Attribute.Text;
    image: Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    climate_change: Attribute.Relation<
      'api::social-consequence.social-consequence',
      'manyToOne',
      'api::climate-change.climate-change'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::social-consequence.social-consequence',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::social-consequence.social-consequence',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiTipTip extends Schema.CollectionType {
  collectionName: 'tips';
  info: {
    singularName: 'tip';
    pluralName: 'tips';
    displayName: 'Tip';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    title: Attribute.String;
    description: Attribute.Text;
    campaign: Attribute.Relation<
      'api::tip.tip',
      'manyToOne',
      'api::campaign.campaign'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'api::tip.tip', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    updatedBy: Attribute.Relation<'api::tip.tip', 'oneToOne', 'admin::user'> &
      Attribute.Private;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface ContentTypes {
      'admin::permission': AdminPermission;
      'admin::user': AdminUser;
      'admin::role': AdminRole;
      'admin::api-token': AdminApiToken;
      'admin::api-token-permission': AdminApiTokenPermission;
      'admin::transfer-token': AdminTransferToken;
      'admin::transfer-token-permission': AdminTransferTokenPermission;
      'plugin::upload.file': PluginUploadFile;
      'plugin::upload.folder': PluginUploadFolder;
      'plugin::content-releases.release': PluginContentReleasesRelease;
      'plugin::content-releases.release-action': PluginContentReleasesReleaseAction;
      'plugin::users-permissions.permission': PluginUsersPermissionsPermission;
      'plugin::users-permissions.role': PluginUsersPermissionsRole;
      'plugin::users-permissions.user': PluginUsersPermissionsUser;
      'plugin::i18n.locale': PluginI18NLocale;
      'api::adaptation-measure.adaptation-measure': ApiAdaptationMeasureAdaptationMeasure;
      'api::adaptation-unsealing.adaptation-unsealing': ApiAdaptationUnsealingAdaptationUnsealing;
      'api::bio-diversity.bio-diversity': ApiBioDiversityBioDiversity;
      'api::call-to-action.call-to-action': ApiCallToActionCallToAction;
      'api::campaign.campaign': ApiCampaignCampaign;
      'api::campus-campaign.campus-campaign': ApiCampusCampaignCampusCampaign;
      'api::category.category': ApiCategoryCategory;
      'api::climate-adaptation.climate-adaptation': ApiClimateAdaptationClimateAdaptation;
      'api::climate-change.climate-change': ApiClimateChangeClimateChange;
      'api::consequence.consequence': ApiConsequenceConsequence;
      'api::consequence-slider-item.consequence-slider-item': ApiConsequenceSliderItemConsequenceSliderItem;
      'api::current-campaign.current-campaign': ApiCurrentCampaignCurrentCampaign;
      'api::economic-consequence.economic-consequence': ApiEconomicConsequenceEconomicConsequence;
      'api::grid-item.grid-item': ApiGridItemGridItem;
      'api::home.home': ApiHomeHome;
      'api::image-card.image-card': ApiImageCardImageCard;
      'api::map-slider-item.map-slider-item': ApiMapSliderItemMapSliderItem;
      'api::page.page': ApiPagePage;
      'api::page-section.page-section': ApiPageSectionPageSection;
      'api::quiz-question.quiz-question': ApiQuizQuestionQuizQuestion;
      'api::reason.reason': ApiReasonReason;
      'api::slider-item.slider-item': ApiSliderItemSliderItem;
      'api::social-consequence.social-consequence': ApiSocialConsequenceSocialConsequence;
      'api::tip.tip': ApiTipTip;
    }
  }
}
