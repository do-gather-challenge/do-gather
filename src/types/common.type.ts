export type Pagination<T> = {
  data: T;
  pagination: {
    page: number;
    limit: number;
    total: number;
    pageCount: number;
  };
};

export type LinkObject = {
  webUrl?: string;
  mobileWebUrl?: string;
  androidExecutionParams?: string;
  iosExecutionParams?: string;
};

export type KakaoType = {
  init: (appKey: string) => void;
  isInitialized: () => boolean;
  Share: {
    sendDefault: (options: {
      objectType: string;
      content: {
        title: string;
        imageUrl: string;
        link: LinkObject;
        imageWidth?: number;
        imageHeight?: number;
        description?: string;
      };
      itemContent?: {
        profileText?: string;
        profileImageUrl?: string;
        titleImageText?: string;
        titleImageUrl?: string;
        titleImageCategory?: string;
        items?: { item: string; itemOp: string }[];
        sum?: string;
        sumOp?: string;
      };
      social?: {
        likeCount?: number;
        commentCount?: number;
        sharedCount?: number;
        viewCount?: number;
        subscriberCount?: number;
      };
      buttonTitle?: string;
      buttons: { title: string; link: LinkObject }[];
      installTalk?: boolean;
      serverCallbackArgs?: Object | string;
    }) => void;
  };
};
