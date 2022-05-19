/* eslint-disable */
export type Schema = {
  comment: {
    plain: {
      id: number;
      postId: number;
      name: string;
      email: string;
      body: string;
      createdAt: string;
      updatedAt: string;
    };
    nested: {
      post: Schema['post']['plain'] & Schema['post']['nested'];
    };
    flat: {
      'post:id': number;
      'post:userId': number;
      'post:title': string;
      'post:body': string;
      'post:createdAt': string;
      'post:updatedAt': string;
    };
  };
  post: {
    plain: {
      id: number;
      userId: number;
      title: string;
      body: string;
      createdAt: string;
      updatedAt: string;
    };
    nested: {};
    flat: {};
  };
};
