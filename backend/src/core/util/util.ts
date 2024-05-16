import slug from "slugify";

export class Util {
  static slugify(content: string) {
    return slug(content, { lower: true });
  }
}