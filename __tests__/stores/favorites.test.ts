import { renderHook, act } from "@testing-library/react";
import { useFavoritesStore } from "@/lib/stores/favorites.store";

describe("useFavoritesStore", () => {
  beforeEach(() => {
    // Clear favorites before each test
    const { result } = renderHook(() => useFavoritesStore());
    act(() => {
      result.current.clearFavorites();
    });
  });

  it("adds a product to favorites", () => {
    const { result } = renderHook(() => useFavoritesStore());

    act(() => {
      result.current.addFavorite("product-1");
    });

    expect(result.current.isFavorite("product-1")).toBe(true);
    expect(result.current.getFavoriteCount()).toBe(1);
  });

  it("removes a product from favorites", () => {
    const { result } = renderHook(() => useFavoritesStore());

    act(() => {
      result.current.addFavorite("product-1");
      result.current.removeFavorite("product-1");
    });

    expect(result.current.isFavorite("product-1")).toBe(false);
    expect(result.current.getFavoriteCount()).toBe(0);
  });

  it("toggles a product in favorites", () => {
    const { result } = renderHook(() => useFavoritesStore());

    act(() => {
      result.current.toggleFavorite("product-1");
    });

    expect(result.current.isFavorite("product-1")).toBe(true);

    act(() => {
      result.current.toggleFavorite("product-1");
    });

    expect(result.current.isFavorite("product-1")).toBe(false);
  });

  it("handles multiple products", () => {
    const { result } = renderHook(() => useFavoritesStore());

    act(() => {
      result.current.addFavorite("product-1");
      result.current.addFavorite("product-2");
      result.current.addFavorite("product-3");
    });

    expect(result.current.getFavoriteCount()).toBe(3);
    expect(result.current.isFavorite("product-2")).toBe(true);
  });

  it("clears all favorites", () => {
    const { result } = renderHook(() => useFavoritesStore());

    act(() => {
      result.current.addFavorite("product-1");
      result.current.addFavorite("product-2");
      result.current.clearFavorites();
    });

    expect(result.current.getFavoriteCount()).toBe(0);
  });
});
