import { render, screen } from "@testing-library/react";
import { expect, test, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import Togglable from "./Togglable";
import BlogForm from "./BlogForm";

test("form calls event handler with right details when new blog created", async () => {
  const submitBlog = vi.fn();
  render(<Togglable buttonLabel="Create new blog" />);

  const user = userEvent.setup();

  const createBlogButton = screen.getByTestId("togglable-visible");
  await user.click(createBlogButton);

  render(<BlogForm createBlog={submitBlog} />);

  const titleInput = screen.getByTestId("title-input");
  const authorInput = screen.getByTestId("author-input");
  const urlInput = screen.getByTestId("url-input");
  const submitButton = screen.getByTestId("submit-button");

  await user.type(titleInput, "Gluten-free apple crumble");
  await user.type(authorInput, "Silvana Franco");
  await user.type(
    urlInput,
    "https://www.bbcgoodfood.com/recipes/gluten-free-apple-crumble",
  );

  await user.click(submitButton);

  expect(submitBlog.mock.calls[0][0].title).toBe("Gluten-free apple crumble");
  expect(submitBlog.mock.calls[0][0].author).toBe("Silvana Franco");
  expect(submitBlog.mock.calls[0][0].url).toBe(
    "https://www.bbcgoodfood.com/recipes/gluten-free-apple-crumble",
  );
});
