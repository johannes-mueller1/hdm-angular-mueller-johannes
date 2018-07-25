export interface BoardInterface {

    /**
     * The ID of the board
     */
    id: string;

    /**
     *  The name of the board
     */
    name: string;

    /**
     * The description of the board.
     * Deprecated
     */
    // desc: string;

    /**
     * If the description includes custom emoji, this will contain the data necessary to display them.
     */
    // descData: string;

    /**
     * Boolean whether the board has been closed or not.
     */
    // closed: boolean;

    /**
     * MongoID of the organization to which the board belongs.
     */
    // idOrganization: string;

    /**
     *  Boolean whether the board has been pinned or not.
     */
    // pinned: boolean;

    /**
     * Persistent URL for the board.
     */
    // url: string;

    /**
     * URL for the board using only its shortMongoID
     */
    // shortUrl: string;

    /**
     *  Short for "preferences", these are the settings for the board
     */
    // prefs: object;

    /**
     *     Object containing color keys and the label names given for one label of each color
     *     on the board. To get a full list of labels on the board see /boards/{id}/labels/.
     */
    // labelNames: object;

    /**
     * Whether the board has been starred by the current request's user.
     */
    // starred: boolean;

    /**
     * An object containing information on the limits that exist for the board. Read more about at Limits.
     */
    // limits: object;

    /**
     * Array of objects that represent the relationship of users to this board as memberships.
     */
    // memberships: object[];
}
