import {
  createRoot,
  getTargetElement,
  getTargetElements,
  parseTestHtml,
} from "./test-utilities";
import { assert } from "chai";
import {
  getCommonParent,
  parentsGenerator,
  testParentSelector,
  viableParentsGenerator,
} from "../src/utilities";

describe("Utilities", () => {
  let root: Element;
  beforeEach(() => {
    root = createRoot();
  });
  afterEach(() => {
    root.parentNode.removeChild(root);
  });

  describe("getCommonParent", () => {
    it("should get direct parent of single element", () => {
      root.innerHTML = `
        <div>
          <div class="directParent">
            <div data-target></div>
          </div>
        </div>
      `;
      const target = getTargetElement(root);
      const result = getCommonParent([target]);
      assert.equal(result.className, "directParent");
    });
    it("should get common parent of multiple elements", () => {
      root.innerHTML = `
        <div>
          <div class="commonParent">
            <div>
              <div data-target></div>
            </div>
            <div data-target></div>
          </div>
        </div>
      `;
      const target = getTargetElements(root);
      const result = getCommonParent(target);
      assert.equal(result.className, "commonParent");
    });
    it("should return `null` if there is no common parent", () => {
      const result = getCommonParent([
        document.createElement("div"),
        document.createElement("div"),
      ]);
      assert.isNull(result);
    });
  });

  describe("parentsGenerator", () => {
    it("should not yield if there are no parents", () => {
      const element = document.createElement("div");
      const generator = parentsGenerator([element]);
      const result = [...generator];
      assert.deepEqual(result, []);
    });
    it("should yield parents of single element", () => {
      root.innerHTML = `
        <div class="grandparent">
          <div class="parent">
            <div data-target></div>
          </div>
        </div>
      `;
      const element = getTargetElement(root);
      const generator = parentsGenerator([element]);
      const result = [...generator];
      assert.equal(result[0].className, "parent");
      assert.equal(result[1].className, "grandparent");
    });
    it("should yield common parents of multiple elements", () => {
      root.innerHTML = `
        <div class="grandparent">
          <div class="parent">
            <div>
              <div data-target></div>
            </div>
            <div data-target></div>
          </div>
        </div>
      `;
      const element = getTargetElements(root);
      const generator = parentsGenerator(element);
      const result = [...generator];
      assert.equal(result[0].className, "parent");
      assert.equal(result[1].className, "grandparent");
    });
    it("should include root if it is an element", () => {
      root.innerHTML = `<div><div></div></div>`;
      const parent = root.firstElementChild;
      const needle = parent.firstElementChild;
      const generator = parentsGenerator([needle], parent);
      const result = [...generator];
      assert.deepEqual(result, [parent]);
    });
    it("should not include root if it is not an element", () => {
      const parent = document.createDocumentFragment();
      const needle = parent.appendChild(document.createElement("div"));
      const generator = parentsGenerator([needle], parent);
      const result = [...generator];
      assert.deepEqual(result, []);
    });
  });

  describe.skip("viableParentsGenerator", () => {
    it("should not yield if there are no viable parents", () => {
      root.innerHTML = `
        <div class="aaa" data-target></div>
        <div class="aaa"></div>
      `;
      const needle = getTargetElements(root);
      const generator = viableParentsGenerator(needle, ".aaa", root);
      const result = [...generator];
      assert.deepEqual(result, []);
    });

    it("should yield viable parents of single element", () => {
      root.innerHTML = `
        <div class="aaa" data-target></div>
        <div class="bbb"></div>
      `;
      const needle = getTargetElements(root);
      const generator = viableParentsGenerator(needle, ".aaa", root);
      const result = [...generator];
      assert.deepEqual(result, [root]);
    });

    it("should yield viable parents of multiple elements element", () => {
      root.innerHTML = `
        <div class="aaa bbb" data-target></div>
        <div class="aaa ccc" data-target></div>
      `;
      const needle = getTargetElements(root);
      const generator = viableParentsGenerator(needle, ".aaa", root);
      const result = [...generator];
      assert.deepEqual(result, [root]);
    });

    it("should yield viable nested parent", () => {
      root.innerHTML = `
        <div class="aaa">
          <div class="aaa" data-target></div>
        </div>
      `;
      const needle = getTargetElements(root);
      const generator = viableParentsGenerator(
        needle,
        ".aaa",
        root.firstElementChild
      );
      const result = [...generator];
      assert.deepEqual(result, [root]);
    });
  });

  describe("testParentSelector", () => {
    it("should return `false` if it matches other than non-child elements within root", () => {
      const data = parseTestHtml(`
        <div class="aaa"><!-- name: needle --></div>
        <div class="aaa"></div>
      `);
      const result = testParentSelector(data.element.needle, ".aaa", data.root);
      assert.isFalse(result);
    });
    it("should return `true` if it matches only needle and some of its children", () => {
      const data = parseTestHtml(`
        <div class="aaa"><!-- name: needle -->
          <div class="aaa"></div>
        </div>
      `);
      const result = testParentSelector(data.element.needle, ".aaa", data.root);
      assert.isTrue(result);
    });
    it("should return `true` if it matches needle uniquely", () => {
      const data = parseTestHtml(`
        <div class="aaa"><!-- name: needle --></div>
      `);
      const result = testParentSelector(data.element.needle, ".aaa", data.root);
      assert.isTrue(result);
    });
  });
});
