/**
 * @typedef {Object} NotionPage
 * @property {string} object - Always "page"
 * @property {string} id - Unique page ID
 * @property {string} created_time - ISO timestamp
 * @property {string} last_edited_time - ISO timestamp
 * @property {{ object: string, id: string }} created_by - Creator info
 * @property {{ object: string, id: string }} last_edited_by - Last editor info
 * @property {null} cover - Page cover (null if none)
 * @property {null} icon - Page icon (null if none)
 * @property {{ type: 'database_id', database_id: string }} parent - Parent database info
 * @property {boolean} archived - Whether the page is archived
 * @property {boolean} in_trash - Whether the page is in trash
 * @property {Object} properties - Page properties
 * @property {{
 *   id: string,
 *   type: 'status',
 *   status: {
 *     id: string,
 *     name: string,
 *     color: string
 *   }
 * }} properties.Status - "Status" field
 * @property {{
 *   id: string,
 *   type: 'number',
 *   number: number|null
 * }} properties.Antal - "Antal" number field
 * @property {{
 *   id: string,
 *   type: 'people',
 *   people: Array
 * }} properties.Person - "Person" people field
 * @property {{
 *   id: string,
 *   type: 'title',
 *   title: Array<{
 *     type: 'text',
 *     text: {
 *       content: string,
 *       link: null|string
 *     },
 *     annotations: {
 *       bold: boolean,
 *       italic: boolean,
 *       strikethrough: boolean,
 *       underline: boolean,
 *       code: boolean,
 *       color: string
 *     },
 *     plain_text: string,
 *     href: null|string
 *   }>
 * }} properties.Title - "Title" field
 * @property {string} url - Full Notion page URL
 * @property {null|string} public_url - Public URL if shared, otherwise null
 */
