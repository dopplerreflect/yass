{
  description = "A basic Nix Flake development shell";

  # Pull dependencies from the official NixOS unstable channel
  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs/nixos-unstable";
  };

  outputs = { self, nixpkgs }:
    let
      system = "x86_64-linux"; 
      pkgs = nixpkgs.legacyPackages.${system};
    in
    {
      devShells.${system}.default = pkgs.mkShell {
        # Tools available inside the shell
        packages = with pkgs; [
          yarn
          jujutsu
        ];

      };
    };
}
